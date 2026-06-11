package sn.uidt.tp3.gestionUniversitaire.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import sn.uidt.tp3.gestionUniversitaire.model.Cours;
import sn.uidt.tp3.gestionUniversitaire.model.Etudiant;
import sn.uidt.tp3.gestionUniversitaire.repository.CoursRepository;
import sn.uidt.tp3.gestionUniversitaire.service.CoursService;
import sn.uidt.tp3.gestionUniversitaire.service.EtudiantService;

import java.util.List;

@RestController
@RequestMapping("/api/cours")
@RequiredArgsConstructor
public class CoursController {

    private final CoursService service;
    private final EtudiantService etudiantService;
    private final CoursRepository coursRepository;

    @GetMapping
    public List<Cours> getAll() {
        return service.listCours();
    }

    @PostMapping
    public Cours create(@RequestBody Cours c) {
        return service.ajoutCours(c);
    }

    @GetMapping("/{coursId}/etudiants")
    public List<Etudiant> getEtudiants(@PathVariable Long coursId) {
        return etudiantService.getEtudiantsParCours(coursId);
    }

    @GetMapping("/avances")
    public List<Cours> coursAvances() {
        return coursRepository.trouverCoursAuDessusMoyenneCredits();
    }
}