package uidt.sn.MicroserviceAuth.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import uidt.sn.MicroserviceAuth.modele.Role;

@Data
@Setter
@Getter
public class RegisterRequest {

    @NotBlank
    private String username;

    @NotBlank
    @Size(min = 4)
    private String password;

    @Email
    private String email;

    private String firstName;
    private String lastName;

    private Role role;

    public @NotBlank String getUsername() {
        return username;
    }

    public @NotBlank @Size(min = 4) String getPassword() {
        return password;
    }

    public @Email String getEmail() {
        return email;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Role getRole() {
        return role;
    }


}