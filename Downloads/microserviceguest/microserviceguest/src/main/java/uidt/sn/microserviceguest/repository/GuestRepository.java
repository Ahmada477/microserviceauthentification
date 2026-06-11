package uidt.sn.microserviceguest.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import uidt.sn.microserviceguest.model.Guest;

import java.util.List;

public interface GuestRepository extends JpaRepository<Guest, Long> {
    List<Guest> findByEventId(Long eventId);

    List<Guest> findByCreatedByUserId(Long userId);

    boolean existsByEmailAndEventId(String email, Long eventId);

    List<Guest> findByEventIdAndFullNameContainingIgnoreCase(Long eventId, String fullName);

    long countByEventId(Long eventId);

    List<Guest> findByIsActiveTrue();
}
