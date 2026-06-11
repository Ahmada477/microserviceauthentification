package uidt.sn.MicroserviceAuth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uidt.sn.MicroserviceAuth.dto.AuthResponse;
import uidt.sn.MicroserviceAuth.dto.LoginRequest;
import uidt.sn.MicroserviceAuth.dto.RegisterRequest;
import uidt.sn.MicroserviceAuth.dto.UserDTO;
import uidt.sn.MicroserviceAuth.modele.RefreshToken;
import uidt.sn.MicroserviceAuth.modele.Role;
import uidt.sn.MicroserviceAuth.modele.User;
import uidt.sn.MicroserviceAuth.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtService jwt;

    @Autowired
    private RefreshTokenService refresh;

    // ✅ INSCRIPTION PUBLIQUE - TOUT LE MONDE PEUT S'INSCRIRE
    // Le rôle est automatiquement USER
    public AuthResponse register(RegisterRequest req) {
        System.out.println("📝 Nouvelle inscription publique: " + req.getUsername());

        // Vérifier si l'utilisateur existe déjà
        if (userRepo.findByUsername(req.getUsername()).isPresent()) {
            throw new RuntimeException("Nom d'utilisateur déjà existant");
        }
        if (userRepo.findByEmail(req.getEmail()).isPresent()) {
            throw new RuntimeException("Email déjà existant");
        }

        User user = new User();
        user.setUsername(req.getUsername());
        user.setPassword(encoder.encode(req.getPassword()));
        user.setEmail(req.getEmail());
        user.setFirstName(req.getFirstName());
        user.setLastName(req.getLastName());
        user.setRole(Role.USER);  // ← TOUJOURS USER PAR DÉFAUT
        user.setEnabled(true);

        userRepo.save(user);
        System.out.println("✅ Utilisateur créé: " + user.getUsername() + " avec rôle: USER");

        String token = jwt.generateToken(user);
        String refreshToken = refresh.create(user.getUsername());

        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setEmail(user.getEmail());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setRole(user.getRole().toString());

        return new AuthResponse(token, refreshToken, userDTO);
    }

    public AuthResponse login(LoginRequest req) {
        System.out.println("🔐 Tentative login: " + req.getUsername());

        User user = userRepo.findByUsername(req.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Bad credentials");
        }

        String token = jwt.generateToken(user);
        String refreshToken = refresh.create(user.getUsername());

        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setEmail(user.getEmail());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setRole(user.getRole().toString());

        System.out.println("✅ Login réussi: " + user.getUsername() + " avec rôle: " + user.getRole());

        return new AuthResponse(token, refreshToken, userDTO);
    }

    public AuthResponse refresh(String token) {
        RefreshToken rt = refresh.verify(token);
        User user = userRepo.findByUsername(rt.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String newToken = jwt.generateToken(user);

        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setEmail(user.getEmail());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setRole(user.getRole().toString());

        return new AuthResponse(newToken, token, userDTO);
    }
}