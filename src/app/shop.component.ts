import { Component, OnInit, Input } from '@angular/core'; 
import { Produit } from "app/model/produit";
import { ProduitService } from "app/service/produit.service";
import { PanierService } from "app/service/panier.service";
import { trigger, state, style, animate, transition } from '@angular/animations';

// @Component pour déclarer notre composant avec un sélector, un template html et un styleUrl
@Component({
  selector: 'shop-component',
  templateUrl: './shop.component.html', // precise le chemin vers le template
  styleUrls: ['./shop.component.css'], // precise le chemin vers le css
  animations: [
    trigger('produitState', [
      state('inactive', style({
        // backgroundColor: '#eee',
        //backgrounColor: '#ff4300',
	      //borderColor: '#f94c02',
	      color: '#fff',
        transform: 'scale(1)'
      })),
      state('active',   style({
        // backgroundColor: '#cfd8dc',
        //backgroundColor: "#008B8B",
	      //borderColor: '#008B8B',
	      color: '#fff',
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})

export class ShopComponent implements OnInit {  

  @Input() produitTrie: Produit; // on crée une entité réutilisable dans d'autres composants
  
  produits: Produit[]; // pour preparer l'affichage de tous les produits (sera vu par la page html) 
  

  constructor(private _produitService : ProduitService, private _panierService : PanierService){ } // _produitService est injecté ici via angular
  
  // ngOnInit : dès que le composant est visuellement prêt, je declenche une requete qui declenche un observable qui permet une requete asynchrone
  ngOnInit(): void {     
    this._produitService.afficherAllProduits()
        .subscribe(listeProd => {this.produits = listeProd; },
                 e => console.log(e.message));    
  }

  private ajoutPanier(produit : Produit) : void {
     this._panierService.Ajouter(produit);
     
     this.toggleState(produit);
     setTimeout(() => this.toggleState(produit), 100);
     //this.toggleState();     
  }
  
  // animation sur boton Ajouter :
  toggle: boolean;
  statut : any;

  toggleState(produit : Produit) {
    //this.toggle = !this.toggle;
    //this.statut = this.toggle ? 'active':'inactive';
    produit.toggle = !produit.toggle;
    produit.statut = produit.toggle ? 'active':'inactive';
  }

}
