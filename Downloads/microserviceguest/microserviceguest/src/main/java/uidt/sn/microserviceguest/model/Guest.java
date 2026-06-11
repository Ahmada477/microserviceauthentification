package uidt.sn.microserviceguest.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Guest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String email;
    private String phone;

    // Références aux autres services (IDs seulement)
    private Long eventId;      // Référence à l'événement
    private Long createdByUserId; // Référence à l'utilisateur qui a créé

    // Données dénormalisées pour éviter trop d'appels inter-services
    private String eventName;
    private String createdByUsername;
    private String createdByEmail;

    // Métadonnées
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean isActive;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        isActive = true;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}