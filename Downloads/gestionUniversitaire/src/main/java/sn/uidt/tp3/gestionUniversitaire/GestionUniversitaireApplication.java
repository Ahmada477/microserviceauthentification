package sn.uidt.tp3.gestionUniversitaire;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import sn.uidt.tp3.gestionUniversitaire.model.Cours;
import sn.uidt.tp3.gestionUniversitaire.model.Etudiant;
import sn.uidt.tp3.gestionUniversitaire.model.Inscription;
import sn.uidt.tp3.gestionUniversitaire.repository.InscriptionRepository;
import sn.uidt.tp3.gestionUniversitaire.service.CoursService;
import sn.uidt.tp3.gestionUniversitaire.service.EtudiantService;

import java.time.LocalDate;

@SpringBootApplication
@RequiredArgsConstructor
public class GestionUniversitaireApplication implements CommandLineRunner {
    private final EtudiantService etudiantService;
	private final CoursService coursService;
	private final InscriptionRepository inscriptionRepository;

	public static void main(String[] args) {
		SpringApplication.run(GestionUniversitaireApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		Etudiant e1 = new Etudiant();
		e1.setNom("Sow");
		e1.setPrenom("Mohamed");
		e1.setEmail("sow23@gmail.com");
		e1.setDateNaissance(LocalDate.of(2002,06,25));
		etudiantService.ajoutEtudiant(e1);

		Cours c1 = new Cours();
		c1.setIntitule("Dev multi-tiers");
		c1.setCredits(8);
		coursService.ajoutCours(c1);

		Inscription i1 = new Inscription();
		i1.setNote(15.50);
		i1.setDateInscription(LocalDate.now());
		i1.setCours(c1);
		i1.setEtudiant(e1);
		inscriptionRepository.save(i1);
	}

}
