package uidt.sn.microservicelogistics.ccontroller;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import uidt.sn.microservicelogistics.dto.LogisticsDTO;
import uidt.sn.microservicelogistics.entity.Logistics;
import uidt.sn.microservicelogistics.model.LogisticsStatus;
import uidt.sn.microservicelogistics.service.LogisticsService;

import java.util.List;

@RestController
@RequestMapping("/logistics")
@RequiredArgsConstructor
public class LogisticsController {

    private final LogisticsService service;

    @PostMapping
    public Logistics create(@RequestBody LogisticsDTO dto) {
        return service.create(dto);
    }

    @GetMapping
    public List<Logistics> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Logistics getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}/status")
    public Logistics updateStatus(@PathVariable Long id,
                                  @RequestParam LogisticsStatus status) {
        return service.updateStatus(id, status);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}