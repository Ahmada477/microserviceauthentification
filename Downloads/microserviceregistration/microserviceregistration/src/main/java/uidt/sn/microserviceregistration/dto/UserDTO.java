// uidt.sn.microserviceregistration.dto.UserDTO.java
package uidt.sn.microserviceregistration.dto;

import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String role;
}