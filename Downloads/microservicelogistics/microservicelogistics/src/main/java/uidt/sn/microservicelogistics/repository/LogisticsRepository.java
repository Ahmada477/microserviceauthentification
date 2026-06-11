package uidt.sn.microservicelogistics.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import uidt.sn.microservicelogistics.entity.Logistics;

public interface LogisticsRepository extends JpaRepository<Logistics, Long> {
}
