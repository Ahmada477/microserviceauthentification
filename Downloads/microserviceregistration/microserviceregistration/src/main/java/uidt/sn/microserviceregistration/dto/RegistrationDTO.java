package uidt.sn.microserviceregistration.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RegistrationDTO {

    @NotNull
    private Long eventId;

    // Pour ADMIN/ORGANIZER
    private Long guestId;

    // Pour USER (inscription directe)
    private String guestName;
    private String guestEmail;
    private String userName;
    private Long userId;
}