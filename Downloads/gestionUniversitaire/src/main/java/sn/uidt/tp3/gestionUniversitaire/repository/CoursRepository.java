package sn.uidt.tp3.gestionUniversitaire.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import sn.uidt.tp3.gestionUniversitaire.model.Cours;

import java.util.List;

@Repository
public interface CoursRepository extends JpaRepository<Cours, Long> {
    List<Cours> findByIntituleContainingIgnoreCase(String intitule);
    List<Cours> findByCreditsGreaterThan(Integer credits);
    @Query("SELECT c FROM Cours c WHERE c.credits > (SELECT AVG(c2.credits) FROM Cours c2)")
    List<Cours> trouverCoursAuDessusMoyenneCredits();
}
