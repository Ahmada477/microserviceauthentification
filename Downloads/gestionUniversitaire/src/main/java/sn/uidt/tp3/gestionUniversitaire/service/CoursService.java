package sn.uidt.tp3.gestionUniversitaire.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sn.uidt.tp3.gestionUniversitaire.model.Cours;
import sn.uidt.tp3.gestionUniversitaire.model.Etudiant;
import sn.uidt.tp3.gestionUniversitaire.repository.CoursRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CoursService {
    private final CoursRepository coursRepository;
    public Cours ajoutCours(Cours cours) {
        return coursRepository.save(cours);
    }
    public List<Cours> listCours(){
        return coursRepository.findAll();
    }
    public Cours reacherCours(Long id) {
        return coursRepository.findById(id).get();
    }
    public void deleteCours(Long id) {
        coursRepository.deleteById(id);
    }
    public Cours updateCours(Cours cours) {
        return coursRepository.save(cours);
    }

}
