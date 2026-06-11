package sn.uidt.tp3.gestionUniversitaire.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sn.uidt.tp3.gestionUniversitaire.exception.ResourceNotFoundException;
import sn.uidt.tp3.gestionUniversitaire.model.Cours;
import sn.uidt.tp3.gestionUniversitaire.model.Etudiant;
import sn.uidt.tp3.gestionUniversitaire.model.Inscription;
import sn.uidt.tp3.gestionUniversitaire.repository.CoursRepository;
import sn.uidt.tp3.gestionUniversitaire.repository.EtudiantRepository;
import sn.uidt.tp3.gestionUniversitaire.repository.InscriptionRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EtudiantService {

    private final EtudiantRepository etudiantRepository;
    private final CoursRepository coursRepository;
    private final InscriptionRepository inscriptionRepository;

    public List<Etudiant> listEtudiant() {
        return etudiantRepository.findAll();
    }

    public Etudiant ajoutEtudiant(Etudiant e) {
        return etudiantRepository.save(e);
    }

    public Etudiant reacherEtudiant(Long id){
        return etudiantRepository.findById(id).get();
    }

    public void deleteEtudiant(Long id){
        etudiantRepository.deleteById(id);
    }

    public Etudiant modifierEtudiant(Etudiant etudiant) {
        return etudiantRepository.save(etudiant);
    }

    public Etudiant inscrireEtudiantACours(Long etudiantId, Long coursId) {

        Etudiant etudiant = etudiantRepository.findById(etudiantId)
                .orElseThrow(() -> new ResourceNotFoundException("Etudiant introuvable"));

        Cours cours = coursRepository.findById(coursId)
                .orElseThrow(() -> new ResourceNotFoundException("Cours introuvable"));

        if (inscriptionRepository.findByEtudiantIdEtuAndCoursIdCours(etudiantId, coursId).isPresent()) {
            throw new RuntimeException("Déjà inscrit !");
        }

        Inscription inscription = new Inscription();
        inscription.setEtudiant(etudiant);
        inscription.setCours(cours);
        inscriptionRepository.save(inscription);
        etudiant.getCours().add(cours);
        etudiantRepository.save(etudiant);
        return etudiant;
    }

    public List<Cours> getCoursParEtudiant(Long etudiantId) {
        return inscriptionRepository.findByEtudiantIdEtu(etudiantId)
                .stream().map(Inscription::getCours).toList();
    }

    public List<Etudiant> getEtudiantsParCours(Long coursId) {
        return inscriptionRepository.findByCoursIdCours(coursId)
                .stream().map(Inscription::getEtudiant).toList();
    }
}