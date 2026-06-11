package uidt.sn.microserviceregistration.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uidt.sn.microserviceregistration.client.AuthClient;
import uidt.sn.microserviceregistration.client.EventClient;
import uidt.sn.microserviceregistration.client.GuestClient;
import uidt.sn.microserviceregistration.dto.RegistrationDTO;
import uidt.sn.microserviceregistration.dto.UserDTO;
import uidt.sn.microserviceregistration.dto.EventDTO;
import uidt.sn.microserviceregistration.dto.GuestDTO;
import uidt.sn.microserviceregistration.entity.Registration;
import uidt.sn.microserviceregistration.model.RegistrationStatus;
import uidt.sn.microserviceregistration.repository.RegistrationRepository;
import uidt.sn.microserviceregistration.utils.QRCodeGenerator;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final EventClient eventClient;
    private final GuestClient guestClient;
    private final AuthClient authClient;

    @Transactional
    public Registration register(RegistrationDTO dto, String token, String username) {

        System.out.println("=== SERVICE REGISTER ===");
        System.out.println("Token: " + (token != null ? token.substring(0, Math.min(50, token.length())) + "..." : "null"));
        System.out.println("Username: " + username);
        System.out.println("EventId: " + dto.getEventId());
        System.out.println("GuestId: " + dto.getGuestId());

        // 1. Récupérer l'événement
        EventDTO event = eventClient.getEventById(dto.getEventId(), token);
        System.out.println("Événement trouvé: " + event.getTitle() + " (Capacité: " + event.getCapacity() + ")");

        // 2. Récupérer l'utilisateur connecté
        UserDTO user = authClient.getUserByUsername(username, token);
        System.out.println("Utilisateur trouvé: " + user.getUsername() + " (Rôle: " + user.getRole() + ")");

        // 3. Vérifier la capacité restante
        long currentRegistrations = registrationRepository.countByEventIdAndStatus(
                dto.getEventId(), RegistrationStatus.CONFIRMED
        );
        System.out.println("Inscriptions actuelles: " + currentRegistrations);

        if (currentRegistrations >= event.getCapacity()) {
            throw new IllegalStateException("L'événement '" + event.getTitle() + "' est complet");
        }

        // 4. Vérifier si déjà inscrit (pour USER)
        boolean alreadyRegistered = registrationRepository.existsByEventIdAndUserId(
                dto.getEventId(), user.getId()
        );

        if (alreadyRegistered) {
            throw new IllegalStateException("Vous êtes déjà inscrit à cet événement");
        }

        // 5. Créer l'inscription
        Registration registration = new Registration();
        registration.setEventId(event.getId());
        registration.setEventTitle(event.getTitle());
        registration.setUserId(user.getId());
        registration.setUserName(user.getUsername());
        registration.setUserEmail(user.getEmail());
        registration.setRegistrationDateTime(LocalDateTime.now());
        registration.setStatus(RegistrationStatus.CONFIRMED);
        registration.setCheckedIn(false);

        // 6. Gestion des invités
        // Cas 1: ADMIN/ORGANIZER inscrit un invité existant
        if (dto.getGuestId() != null && dto.getGuestId() > 0) {
            try {
                GuestDTO guest = guestClient.getGuestById(dto.getGuestId(), token);
                registration.setGuestId(guest.getId());
                registration.setGuestName(guest.getFullName());
                registration.setGuestEmail(guest.getEmail());
                System.out.println("Inscription d'un invité existant: " + guest.getFullName());
            } catch (Exception e) {
                System.err.println("Erreur récupération guest: " + e.getMessage());
                registration.setGuestName(user.getFirstName() + " " + user.getLastName());
                registration.setGuestEmail(user.getEmail());
            }
        }
        // Cas 2: USER s'inscrit directement
        else if (dto.getGuestName() != null && !dto.getGuestName().isEmpty()) {
            registration.setGuestName(dto.getGuestName());
            registration.setGuestEmail(dto.getGuestEmail());
            System.out.println("Inscription directe USER: " + dto.getGuestName());
        }
        // Cas 3: Fallback
        else {
            registration.setGuestName(user.getFirstName() + " " + user.getLastName());
            registration.setGuestEmail(user.getEmail());
            System.out.println("Inscription fallback: " + registration.getGuestName());
        }

        // 7. Générer un QR code unique
        String qrCodeData = String.format("REG:%d:%d:%s",
                registration.getEventId(),
                registration.getUserId(),
                UUID.randomUUID().toString()
        );
        registration.setQrCode(QRCodeGenerator.generate(qrCodeData));
        System.out.println("QR Code généré");

        Registration saved = registrationRepository.save(registration);
        System.out.println("✅ Inscription sauvegardée avec ID: " + saved.getId());

        return saved;
    }

    @Transactional
    public Registration checkIn(Long registrationId) {
        System.out.println("=== CHECK-IN ===");
        System.out.println("Registration ID: " + registrationId);

        Registration registration = registrationRepository.findById(registrationId)
                .orElseThrow(() -> new RuntimeException("Inscription non trouvée"));

        if (registration.isCheckedIn()) {
            throw new IllegalStateException("Check-in déjà effectué");
        }

        registration.setCheckedIn(true);
        registration.setCheckInDateTime(LocalDateTime.now());
        registration.setStatus(RegistrationStatus.CONFIRMED);

        System.out.println("✅ Check-in effectué pour: " + registration.getGuestName());

        return registrationRepository.save(registration);
    }

    public List<Registration> getByEventId(Long eventId) {
        System.out.println("=== GET BY EVENT ID ===");
        System.out.println("Event ID: " + eventId);
        return registrationRepository.findByEventId(eventId);
    }

    public List<Registration> getByUserId(Long userId) {
        System.out.println("=== GET BY USER ID ===");
        System.out.println("User ID: " + userId);
        return registrationRepository.findByUserId(userId);
    }

    @Transactional
    public void cancel(Long id, String token, String username) {
        System.out.println("=== CANCEL REGISTRATION ===");
        System.out.println("Registration ID: " + id);
        System.out.println("Username: " + username);

        Registration registration = registrationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inscription non trouvée"));

        UserDTO user = authClient.getUserByUsername(username, token);

        // Vérifier que l'utilisateur a le droit d'annuler
        if (!registration.getUserId().equals(user.getId()) && !user.getRole().equals("ADMIN")) {
            throw new SecurityException("Vous n'avez pas le droit d'annuler cette inscription");
        }

        registration.setStatus(RegistrationStatus.CANCELLED);
        registrationRepository.save(registration);

        System.out.println("✅ Inscription annulée");
    }

    public List<Registration> getAll() {
        System.out.println("=== GET ALL REGISTRATIONS ===");
        return registrationRepository.findAll();
    }
}