package sn.uidt.tp3.gestionUniversitaire.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sn.uidt.tp3.gestionUniversitaire.model.Inscription;
import java.util.List;
import java.util.Optional;

@Repository
public interface InscriptionRepository extends JpaRepository<Inscription, Long> {
   List<Inscription> findByEtudiantIdEtu(Long etudiantId);
   List<Inscription> findByCoursIdCours(Long coursId);
   Optional<Inscription> findByEtudiantIdEtuAndCoursIdCours(Long etudiantId, Long coursId);
}
