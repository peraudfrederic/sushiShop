import { Component } from '@angular/core'; 
import { Produit } from "app/model/produit";
import { ProduitService } from "app/service/produit.service";

// @Component pour déclarer notre composant avec un sélector, un template html et un styleUrl
@Component({
  selector: 'detailProduit-component',
  templateUrl: './detailProduit.component.html', // precise le chemin vers le template
  styleUrls: ['./detailProduit.component.css'] // precise le chemin vers le css
})

export class DetailProduitComponent {

    produitSelectionne : Produit; // produit selectionné à afficher

    constructor(private _produitService : ProduitService){ // _produitService est injecté ici via angular

    }

}