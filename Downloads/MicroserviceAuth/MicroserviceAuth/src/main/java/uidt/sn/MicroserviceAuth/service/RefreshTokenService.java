package uidt.sn.MicroserviceAuth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import uidt.sn.MicroserviceAuth.modele.RefreshToken;
import uidt.sn.MicroserviceAuth.repository.RefreshTokenRepository;

import java.util.Date;
import java.util.UUID;

@Service
public class RefreshTokenService {

    @Autowired
    private RefreshTokenRepository repo;

    @Value("${jwt.refresh-expiration}")
    private long expiration;

    public String create(String username) {

        RefreshToken token = new RefreshToken();
        token.setToken(UUID.randomUUID().toString());
        token.setUsername(username);
        token.setExpiryDate(new Date(System.currentTimeMillis() + expiration));

        repo.save(token);

        return token.getToken();
    }

    public RefreshToken verify(String token) {
        return repo.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));
    }
}