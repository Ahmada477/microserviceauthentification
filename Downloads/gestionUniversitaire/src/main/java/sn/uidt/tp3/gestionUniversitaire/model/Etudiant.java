package sn.uidt.tp3.gestionUniversitaire.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Etudiant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEtu;
    @Column(nullable = false)
    private String nom ;
    @Column(nullable = false)
    private String prenom;
    @Column(nullable = false, unique = true)
    @Email
    private String email ;
    private LocalDate dateNaissance ;
    @ManyToMany
    @JoinTable(name = "etudiant_cours",
    joinColumns = @JoinColumn(name="idEtu"),
    inverseJoinColumns =  @JoinColumn(name="idCours"))
    private List<Cours> cours ;
    @OneToMany(mappedBy = "etudiant")
    private List<Inscription> inscriptions ;
}