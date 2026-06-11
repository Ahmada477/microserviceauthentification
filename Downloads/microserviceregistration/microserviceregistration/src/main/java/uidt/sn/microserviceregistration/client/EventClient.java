package uidt.sn.microserviceregistration.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import uidt.sn.microserviceregistration.dto.EventDTO;

@FeignClient(name = "event-service", url = "http://localhost:8081")
public interface EventClient {

    @GetMapping("/events/{id}")
    EventDTO getEventById(@PathVariable("id") Long id,
                          @RequestHeader("Authorization") String token);
}