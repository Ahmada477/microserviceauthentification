package uidt.sn.MicroserviceAuth.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uidt.sn.MicroserviceAuth.dto.AuthResponse;
import uidt.sn.MicroserviceAuth.dto.LoginRequest;
import uidt.sn.MicroserviceAuth.dto.RegisterRequest;
import uidt.sn.MicroserviceAuth.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest req) {
        System.out.println("📝 Requête d'inscription reçue: " + req.getUsername());
        AuthResponse response = service.register(req);
        System.out.println("✅ Inscription réussie pour: " + req.getUsername());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest req) {
        System.out.println("🔐 Requête de login reçue: " + req.getUsername());
        AuthResponse response = service.login(req);
        System.out.println("✅ Login réussi pour: " + req.getUsername());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@RequestParam String token) {
        return ResponseEntity.ok(service.refresh(token));
    }
}