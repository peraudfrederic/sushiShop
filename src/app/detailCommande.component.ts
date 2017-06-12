import { Component, Input } from '@angular/core'; 
import { Commande } from "app/model/commande";
import { ActivatedRoute } from "@angular/router";
import { LigneCommandeService } from "app/service/ligneCommande.service";
import { LigneCommande } from "app/model/ligneCommande";

// @Component pour déclarer notre composant avec un sélector, un template html et un styleUrl
@Component({
  selector: 'detailCommande-component',
  templateUrl: './detailCommande.component.html', // precise le chemin vers le template
  styleUrls: ['./detailCommande.component.css'] // precise le chemin vers le css
})

export class DetailCommandeComponent {
    private id : number; // id de la commande a afficher
    private lignesCommande : LigneCommande[]; // commande selectionnée à afficher
    private montantTTC : number;
    private montantHT : number;
    private TVA : number;
    
    constructor(private _ligneCommandeService : LigneCommandeService, private route: ActivatedRoute){} // _produitService est injecté ici via angular    

    ngOnInit(): void {
       this.id = this.route.snapshot.params['id']; // on recupere l'id passe en parametre dans URL
       //console.log(this.id); 

       this._ligneCommandeService.afficherAllLignesCommandesByCommande(this.id)
         .subscribe(lgnesCommande => {this.lignesCommande = lgnesCommande;
        this.afficherMontants() ; }, // afficherMontants() doit etre appelee dans subscribe sinon probleme asynchrone
                 e => console.log(e.message));
 
    }
      public getMontantTTC() : number {
        let montant = 0.0;
        this.lignesCommande.forEach(ligne => {
                montant += ligne.prix * ligne.quantite;                
            });       

        return montant;
    }

    public getMontantHT() : number {
      let montant = this.getMontantTTC();
        let taux = 100 - this.getTVA();
        montant *= taux;
        montant /= 100;
        return montant;
    }

    public getTVA() : number {
        return 5.5;
    } 

    private afficherMontants() : void {
       this.TVA = this.getTVA();
       this.montantTTC = this.getMontantTTC();
       this.montantHT = this.getMontantHT();
    }

}