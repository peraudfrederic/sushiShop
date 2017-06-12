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
    id : number; // id de la commande a afficher
    @Input() lignesCommande : LigneCommande[]; // commande selectionnée à afficher
    
    constructor(private _ligneCommandeService : LigneCommandeService, private route: ActivatedRoute){} // _produitService est injecté ici via angular    

    ngOnInit(): void {
       this.id = this.route.snapshot.params['id']; // on recupere l'id passe en parametre dans URL
       //console.log(this.id); 

       this._ligneCommandeService.afficherAllLignesCommandesByCommande(this.id)
        .subscribe(lignesCommande => {this.lignesCommande = lignesCommande; },
                 e => console.log(e.message));
    }
}