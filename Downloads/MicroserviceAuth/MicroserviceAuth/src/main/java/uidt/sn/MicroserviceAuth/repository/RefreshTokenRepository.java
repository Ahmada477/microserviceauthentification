package uidt.sn.MicroserviceAuth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uidt.sn.MicroserviceAuth.modele.RefreshToken;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
}