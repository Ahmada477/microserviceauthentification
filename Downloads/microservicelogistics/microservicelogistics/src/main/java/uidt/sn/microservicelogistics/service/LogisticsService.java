package uidt.sn.microservicelogistics.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import uidt.sn.microservicelogistics.dto.LogisticsDTO;
import uidt.sn.microservicelogistics.entity.Logistics;
import uidt.sn.microservicelogistics.model.LogisticsStatus;
import uidt.sn.microservicelogistics.repository.LogisticsRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LogisticsService {

    private final LogisticsRepository repository;

    public Logistics create(LogisticsDTO dto) {

        Logistics l = new Logistics();
        l.setEventId(dto.getEventId());
        l.setLocation(dto.getLocation());
        l.setEquipment(dto.getEquipment());
        l.setCapacity(dto.getCapacity());
        l.setStatus(LogisticsStatus.PLANNED);

        return repository.save(l);
    }

    public List<Logistics> getAll() {
        return repository.findAll();
    }

    public Logistics getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Logistics not found"));
    }

    public Logistics updateStatus(Long id, LogisticsStatus status) {
        Logistics l = getById(id);
        l.setStatus(status);
        return repository.save(l);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
