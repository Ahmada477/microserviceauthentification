package uidt.sn.microserviceregistration.entity;

import jakarta.persistence.*;
import lombok.*;
import uidt.sn.microserviceregistration.model.RegistrationStatus;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Registration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Références aux autres services (IDs seulement)
    private Long eventId;
    private Long guestId;
    private Long userId; // L'utilisateur qui s'est inscrit

    // Données dénormalisées pour éviter trop d'appels inter-services
    private String guestName;
    private String eventTitle;
    private String guestEmail;
    private String userName;
    private String userEmail;

    // Données d'inscription
    private LocalDateTime registrationDateTime;
    @Column(length = 5000)
    private String qrCode;
    private boolean checkedIn;
    private LocalDateTime checkInDateTime;

    @Enumerated(EnumType.STRING)
    private RegistrationStatus status;
}