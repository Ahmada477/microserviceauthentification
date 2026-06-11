package sn.uidt.tp3.gestionUniversitaire.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import sn.uidt.tp3.gestionUniversitaire.model.Cours;
import sn.uidt.tp3.gestionUniversitaire.model.Etudiant;
import sn.uidt.tp3.gestionUniversitaire.service.EtudiantService;

import java.util.List;

@RestController
@RequestMapping("/api/etudiants")
@RequiredArgsConstructor
public class EtudiantController {
    private final EtudiantService service;

    @GetMapping
    public List<Etudiant> getAll() {
        return service.listEtudiant();
    }

    @PostMapping
    public Etudiant create(@RequestBody Etudiant e) {
        return service.ajoutEtudiant(e);
    }

    @PostMapping("/{etudiantId}/cours/{coursId}")
    public Etudiant inscrire(@PathVariable Long etudiantId, @PathVariable Long coursId) {
        return service.inscrireEtudiantACours(etudiantId, coursId);
    }

    @GetMapping("/{id}/cours")
    public List<Cours> getCours(@PathVariable Long id) {
        return service.getCoursParEtudiant(id);
    }

    @GetMapping("/recherche")
    public List<Etudiant> rechercher(@RequestParam String nom) {
        return service.listEtudiant().stream()
                .filter(e -> e.getNom().toLowerCase().contains(nom.toLowerCase()))
                .toList();
    }
}