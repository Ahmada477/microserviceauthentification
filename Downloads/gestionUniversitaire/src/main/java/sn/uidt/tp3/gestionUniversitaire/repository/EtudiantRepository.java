package sn.uidt.tp3.gestionUniversitaire.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sn.uidt.tp3.gestionUniversitaire.model.Etudiant;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {
    List<Etudiant> findByNomContainingIgnoreCase(String nom);
    List<Etudiant> findByDateNaissanceAfter(LocalDate date);
    Optional<Etudiant> findByEmail(String email);
    List<Etudiant> findByCoursIdCours(Long coursId);
    @Query("SELECT e FROM Etudiant e WHERE SIZE(e.cours) >= :minCours")
    List<Etudiant> trouverEtudiantsAvecMinimumCours(@Param("minCours") int minCours);
}
