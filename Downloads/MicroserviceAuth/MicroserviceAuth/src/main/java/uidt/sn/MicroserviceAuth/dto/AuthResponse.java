package uidt.sn.MicroserviceAuth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AuthResponse {
    private String token;
    private String refreshToken;
    private UserDTO user;

    public AuthResponse(String accessToken, String refreshToken,UserDTO user) {
        this.token = accessToken;
        this.refreshToken = refreshToken;
        this.user = user;
    }

    public String getAccessToken() {
        return token;
    }

    public String getRefreshToken() {
        return refreshToken;
    }
}