package uidt.sn.microserviceregistration.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import uidt.sn.microserviceregistration.dto.UserDTO;

@FeignClient(name = "auth-service", url = "http://localhost:8084")
public interface AuthClient {

    @GetMapping("/users/username/{username}")
    UserDTO getUserByUsername(@PathVariable("username") String username,
                              @RequestHeader("Authorization") String token);

    @GetMapping("/users/{id}")
    UserDTO getUserById(@PathVariable("id") Long id,
                        @RequestHeader("Authorization") String token);
}