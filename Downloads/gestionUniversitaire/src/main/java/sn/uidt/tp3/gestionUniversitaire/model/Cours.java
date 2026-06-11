package sn.uidt.tp3.gestionUniversitaire.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cours {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCours;
    @Column(nullable = false, unique = true)
    private String intitule;
    @Column(unique = true)
    private int credits;

    @ManyToMany(mappedBy = "cours")
    private List<Etudiant> etudiants;

    @OneToMany(mappedBy = "cours")
    private List<Inscription> inscriptions ;
}
