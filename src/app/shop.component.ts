import { Component, OnInit, Input } from '@angular/core'; 
import { Produit } from "app/model/produit";
import { ProduitService } from "app/service/produit.service";
import { PanierService } from "app/service/panier.service";
//import { trigger, state, style, animate, transition } from '@angular/animations';

// @Component pour déclarer notre composant avec un sélector, un template html et un styleUrl
@Component({
  selector: 'shop-component',
  templateUrl: './shop.component.html', // precise le chemin vers le template
  styleUrls: ['./shop.component.css'] // precise le chemin vers le css
})

export class ShopComponent implements OnInit {  

  @Input() produitTrie: Produit; // on crée une entité réutilisable dans d'autres composants
  
   produits: Produit[]; // pour preparer l'affichage (sera vu par la page html) 
     
   constructor(private _produitService : ProduitService, private _panierService : PanierService){ } // _produitService est injecté ici via angular
  
  // ngOnInit : dès que le composant est visuellement prêt, je declenche une requete qui declenche un observable qui permet une requete asynchrone
  ngOnInit(): void {     
    this._produitService.afficherAllProduits()
        .subscribe(listeProd => {this.produits = listeProd; },
                 e => console.log(e.message)); 
  }

  private ajoutPanier(produit : Produit) : void {
     this._panierService.Ajouter(produit);
  }


}
