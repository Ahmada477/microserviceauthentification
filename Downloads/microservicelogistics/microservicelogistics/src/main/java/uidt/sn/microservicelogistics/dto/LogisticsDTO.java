package uidt.sn.microservicelogistics.dto;


import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class LogisticsDTO {

    @NotNull
    private Long eventId;

    @NotBlank
    private String location;

    @NotBlank
    private String equipment;

    @Min(1)
    private int capacity;
}
