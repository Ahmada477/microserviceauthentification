// uidt.sn.microserviceregistration.dto.GuestDTO.java
package uidt.sn.microserviceregistration.dto;

import lombok.Data;

@Data
public class GuestDTO {
    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private String eventName;
}