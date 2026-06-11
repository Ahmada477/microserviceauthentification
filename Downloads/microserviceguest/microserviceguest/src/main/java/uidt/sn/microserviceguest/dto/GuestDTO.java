package uidt.sn.microserviceguest.dto;


import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class GuestDTO {
    private Long id;

    @NotBlank
    private String fullName;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String phone;

    @NotBlank
    private String eventId;
}