// uidt.sn.microserviceguest.client.AuthClient.java
package uidt.sn.microserviceguest.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import uidt.sn.microserviceguest.dto.UserDTO;

@FeignClient(name = "auth-service", url = "http://localhost:8084")
public interface AuthClient {

    @GetMapping("/users/{id}")
    UserDTO getUserById(@PathVariable Long id, @RequestHeader("Authorization") String token);

    @GetMapping("/users/username/{username}")
    UserDTO getUserByUsername(@PathVariable String username, @RequestHeader("Authorization") String token);
}