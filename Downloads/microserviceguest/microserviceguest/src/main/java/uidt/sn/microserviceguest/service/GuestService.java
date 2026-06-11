package uidt.sn.microserviceguest.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uidt.sn.microserviceguest.client.AuthClient;
import uidt.sn.microserviceguest.client.EventClient;
import uidt.sn.microserviceguest.dto.EventDTO;
import uidt.sn.microserviceguest.dto.GuestDTO;
import uidt.sn.microserviceguest.dto.UserDTO;
import uidt.sn.microserviceguest.model.Guest;
import uidt.sn.microserviceguest.repository.GuestRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GuestService {

    private final GuestRepository guestRepository;
    private final EventClient eventClient;
    private final AuthClient authClient;

    @Transactional
    public Guest create(GuestDTO dto, String token, String username) {
        // 1. Récupérer les données depuis les autres microservices
        EventDTO event = eventClient.getEventById(Long.valueOf(dto.getEventId()), token);
        UserDTO user = authClient.getUserByUsername(username, token);

        // 2. Vérifier si l'email existe déjà pour cet événement
        if (guestRepository.existsByEmailAndEventId(dto.getEmail(), Long.valueOf(dto.getEventId()))) {
            throw new IllegalStateException("Un invité avec cet email existe déjà pour cet événement");
        }

        // 3. Créer l'invité avec dénormalisation
        Guest guest = new Guest();
        guest.setFullName(dto.getFullName());
        guest.setEmail(dto.getEmail());
        guest.setPhone(dto.getPhone());
        guest.setEventId(event.getId());
        guest.setEventName(event.getTitle());
        guest.setCreatedByUserId(user.getId());
        guest.setCreatedByUsername(user.getUsername());
        guest.setCreatedByEmail(user.getEmail());

        return guestRepository.save(guest);
    }

    @Transactional
    public Guest update(Long id, GuestDTO dto, String token, String username) {
        Guest guest = guestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invité non trouvé"));

        UserDTO user = authClient.getUserByUsername(username, token);

        // Vérifier les droits (seulement le créateur ou ADMIN)
        if (!guest.getCreatedByUserId().equals(user.getId()) && !user.getRole().equals("ADMIN")) {
            throw new SecurityException("Vous n'avez pas le droit de modifier cet invité");
        }

        // Mettre à jour les informations
        if (dto.getFullName() != null) guest.setFullName(dto.getFullName());
        if (dto.getEmail() != null) guest.setEmail(dto.getEmail());
        if (dto.getPhone() != null) guest.setPhone(dto.getPhone());

        return guestRepository.save(guest);
    }

    public List<Guest> getAll() {
        return guestRepository.findAll();
    }

    public Guest getById(Long id) {
        return guestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invité non trouvé"));
    }

    public List<Guest> getByEventId(Long eventId) {
        return guestRepository.findByEventId(eventId);
    }

    public List<Guest> getByCreatedByUserId(Long userId) {
        return guestRepository.findByCreatedByUserId(userId);
    }

    @Transactional
    public void delete(Long id, String token, String username) {
        Guest guest = guestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invité non trouvé"));

        UserDTO user = authClient.getUserByUsername(username, token);

        // Vérifier les droits
        if (!guest.getCreatedByUserId().equals(user.getId()) && !user.getRole().equals("ADMIN")) {
            throw new SecurityException("Vous n'avez pas le droit de supprimer cet invité");
        }

        guestRepository.delete(guest);
    }

    @Transactional
    public Guest addToWaitingList(Long id, String token, String username) {
        Guest guest = getById(id);
        guest.setActive(false); // Marquer comme en liste d'attente
        // Autres logiques pour la liste d'attente
        return guestRepository.save(guest);
    }

    public List<Guest> searchByEventAndName(Long eventId, String searchTerm) {
        return guestRepository.findByEventIdAndFullNameContainingIgnoreCase(eventId, searchTerm);
    }
}