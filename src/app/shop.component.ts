import { Component, OnInit } from '@angular/core'; 
import { Produit } from "app/model/produit";
import { ProduitService } from "app/service/produit.service";

// @Component pour déclarer notre composant avec un sélector, un template html et un styleUrl
@Component({
  selector: 'shop-component',
  templateUrl: './shop.component.html', // precise le chemin vers le template
  styleUrls: ['./shop.component.css'] // precise le chemin vers le css
})

export class ShopComponent implements OnInit {
   produits: Produit[]; // pour preparer l'affichage (sera vu par la page html) 
   produitSelectionne : Produit; // produit selectionné à afficher
     
   constructor(private _produitService : ProduitService){ // _produitService est injecté ici via angular

  }
  
  ngOnInit(): void { // ngOnInit : dès que le composant est visuellement prêt
    // je declenche une requete qui declenche un observable qui permet une requete asynchrone
    this._produitService.rechercherAllProduits()
      .subscribe(listeProd => {this.produits = listeProd;
                            if(this.produits.length >=1)
                              this.produitSelectionne = this.produits[0]; },
                 e => console.log(e.message));
  }
}