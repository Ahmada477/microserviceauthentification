package uidt.sn.microserviceregistration.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uidt.sn.microserviceregistration.dto.RegistrationDTO;
import uidt.sn.microserviceregistration.entity.Registration;
import uidt.sn.microserviceregistration.service.RegistrationService;

import java.util.List;

@RestController
@RequestMapping("/registrations")
@RequiredArgsConstructor
public class RegistrationController {

    private final RegistrationService service;

    @PostMapping
    public ResponseEntity<Registration> register(
            @RequestBody RegistrationDTO dto,
            @RequestHeader("Authorization") String token,
            @RequestHeader("X-User") String username
    ) {
        System.out.println("=== REGISTRATION CONTROLLER ===");
        System.out.println("Authorization header: " + (token != null ? "Présent" : "Absent"));
        System.out.println("X-User: " + username);
        System.out.println("DTO reçu: eventId=" + dto.getEventId() + ", guestId=" + dto.getGuestId());

        return ResponseEntity.ok(service.register(dto, token, username));
    }

    @GetMapping
    public ResponseEntity<List<Registration>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping("/{id}/checkin")
    public ResponseEntity<Registration> checkIn(@PathVariable Long id) {
        return ResponseEntity.ok(service.checkIn(id));
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<Registration>> getByEvent(@PathVariable Long eventId) {
        return ResponseEntity.ok(service.getByEventId(eventId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Registration>> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getByUserId(userId));
    }

    @PutMapping("/cancel/{id}")
    public ResponseEntity<Void> cancel(
            @PathVariable Long id,
            @RequestHeader("Authorization") String token,
            @RequestHeader("X-User") String username
    ) {
        service.cancel(id, token, username);
        return ResponseEntity.ok().build();
    }
}