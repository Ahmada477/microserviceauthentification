package uidt.sn.microserviceguest.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uidt.sn.microserviceguest.dto.GuestDTO;
import uidt.sn.microserviceguest.model.Guest;
import uidt.sn.microserviceguest.service.GuestService;

import java.util.List;

@RestController
@RequestMapping("/guests")
@RequiredArgsConstructor
public class GuestController {

    private final GuestService service;

    @PostMapping
    public ResponseEntity<Guest> create(
            @RequestBody GuestDTO dto,
            @RequestHeader("Authorization") String token,
            @RequestHeader("X-User") String username
    ) {
        return ResponseEntity.ok(service.create(dto, token, username));
    }

    @GetMapping
    public ResponseEntity<List<Guest>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Guest> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Guest> update(
            @PathVariable Long id,
            @RequestBody GuestDTO dto,
            @RequestHeader("Authorization") String token,
            @RequestHeader("X-User") String username
    ) {
        return ResponseEntity.ok(service.update(id, dto, token, username));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id,
            @RequestHeader("Authorization") String token,
            @RequestHeader("X-User") String username
    ) {
        service.delete(id, token, username);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<Guest>> getByEvent(@PathVariable Long eventId) {
        return ResponseEntity.ok(service.getByEventId(eventId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Guest>> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getByCreatedByUserId(userId));
    }

    @PostMapping("/{id}/waiting-list")
    public ResponseEntity<Guest> addToWaitingList(
            @PathVariable Long id,
            @RequestHeader("Authorization") String token,
            @RequestHeader("X-User") String username
    ) {
        return ResponseEntity.ok(service.addToWaitingList(id, token, username));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Guest>> search(
            @RequestParam Long eventId,
            @RequestParam String term
    ) {
        return ResponseEntity.ok(service.searchByEventAndName(eventId, term));
    }
}