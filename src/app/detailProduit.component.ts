import { Component, OnInit } from '@angular/core'; 
import { Produit } from "app/model/produit";
import { ProduitService } from "app/service/produit.service";
import { ActivatedRoute } from "@angular/router";
import { PanierService } from "app/service/panier.service";

// @Component pour déclarer notre composant avec un sélector, un template html et un styleUrl
@Component({
  selector: 'detailProduit-component',
  templateUrl: './detailProduit.component.html', // precise le chemin vers le template
  styleUrls: ['./detailProduit.component.css'] // precise le chemin vers le css
})

export class DetailProduitComponent implements OnInit {
    
    id : number;
    produitSelectionne : Produit; // produit selectionné à afficher
    
    constructor(private _produitService : ProduitService, private _panierService : PanierService, private route: ActivatedRoute){} // _produitService est injecté ici via angular    

    ngOnInit(): void {
       this.id = this.route.snapshot.params['id']; // on recupere l'id passe en parametre dans URL
       //console.log(this.id); 

       this._produitService.afficherDetailProduit(this.id)
        .subscribe(produit => {this.produitSelectionne = produit; },
                 e => console.log(e.message));
    }

    private ajoutPanier() : void {
       this._panierService.Ajouter(this.produitSelectionne);
    }
   
    



     



}