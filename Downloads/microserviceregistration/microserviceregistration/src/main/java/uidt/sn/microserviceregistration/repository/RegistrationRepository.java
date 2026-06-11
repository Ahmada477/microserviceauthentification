package uidt.sn.microserviceregistration.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import uidt.sn.microserviceregistration.entity.Registration;
import uidt.sn.microserviceregistration.model.RegistrationStatus;

import java.util.List;


public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    long countByEventIdAndStatus(Long eventId, RegistrationStatus status);

    boolean existsByEventIdAndGuestId(Long eventId, Long guestId);

    List<Registration> findByEventId(Long eventId);

    List<Registration> findByUserId(Long userId);

    List<Registration> findByStatus(RegistrationStatus status);
    boolean existsByEventIdAndUserId(Long eventId, Long userId);
}
