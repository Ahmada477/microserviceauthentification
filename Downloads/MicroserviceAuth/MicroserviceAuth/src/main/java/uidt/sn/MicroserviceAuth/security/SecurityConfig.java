package uidt.sn.MicroserviceAuth.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filter(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // Routes publiques (authentification uniquement)
                        .requestMatchers("/auth/login").permitAll()
                        .requestMatchers("/auth/refresh").permitAll()
                        .requestMatchers("/auth/register").permitAll()
                        .requestMatchers("/users/username/**").permitAll()  // ← AJOUTER CETTE LIGNE
                        .requestMatchers("/users/{id}").permitAll()

                        // Désactiver complètement l'inscription publique
                        // .requestMatchers("/auth/register").permitAll()  ← COMMENTÉ

                        // Routes nécessitant le rôle ADMIN
                        // .requestMatchers("/users/**").hasRole("ADMIN")

                        // Alternative: routes protégées mais vérification dans le controller
                        .requestMatchers("/users/**").authenticated()

                        // Toutes les autres routes
                        .anyRequest().authenticated()
                )
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}