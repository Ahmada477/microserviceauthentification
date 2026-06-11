// uidt.sn.microserviceguest.dto.EventDTO.java
package uidt.sn.microserviceguest.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class EventDTO {
    private Long id;
    private String title;
    private String description;
    private LocalDate date;
    private String location;
    private int capacity;
    private String createdBy;
}