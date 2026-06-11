package uidt.sn.microserviceregistration.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import uidt.sn.microserviceregistration.dto.GuestDTO;

@FeignClient(name = "guest-service", url = "http://localhost:8082")
public interface GuestClient {

    @GetMapping("/guests/{id}")
    GuestDTO getGuestById(@PathVariable("id") Long id,
                          @RequestHeader("Authorization") String token);
}