package sn.uidt.tp3.gestionUniversitaire.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Inscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idIns;
    private LocalDate dateInscription;
    private Double note;
    @ManyToOne
    @JoinColumn(name="idEtu")
    private Etudiant etudiant;
    @ManyToOne
    @JoinColumn(name="idCours")
    private Cours cours;
}
