package uidt.sn.microservicelogistics.entity;


import jakarta.persistence.*;
import lombok.*;
import uidt.sn.microservicelogistics.model.LogisticsStatus;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Logistics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long eventId;

    private String location; // salle, adresse

    private String equipment; // ex: "projector, chairs"

    private int capacity;

    @Enumerated(EnumType.STRING)
    private LogisticsStatus status;
}