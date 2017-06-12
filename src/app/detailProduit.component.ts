import { Component, OnInit, Input } from '@angular/core'; 
import { Produit } from "app/model/produit";
import { ProduitService } from "app/service/produit.service";
import { ActivatedRoute } from "@angular/router";
import { PanierService } from "app/service/panier.service";
import { trigger, state, style, animate, transition } from '@angular/animations';

// @Component pour déclarer notre composant avec un sélector, un template html et un styleUrl
@Component({
  selector: 'detailProduit-component',
  templateUrl: './detailProduit.component.html', // precise le chemin vers le template
  styleUrls: ['./detailProduit.component.css'], // precise le chemin vers le css
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

export class DetailProduitComponent implements OnInit {
    
    id : number;
    @Input() produitSelectionne : Produit; // produit selectionné à afficher
    
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
       this.toggleState(this.produitSelectionne);
       setTimeout(() => this.toggleState(this.produitSelectionne), 100);
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