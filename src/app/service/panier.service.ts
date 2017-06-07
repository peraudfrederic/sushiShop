import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { PanierLigne } from "../model/panierLigne";

@Injectable() // Quand on fait un service, il est toujours @Injectable()
export class PanierService{

    private _headers = new Headers({'Content-Type': 'application/json'});

    panier : Array <PanierLigne>;

    constructor(private _http : Http){
        // _http injecté ici servira à appeler des WS REST
    }
    
    
    public Ajout(idproduit: number, prix : number) : void {
        
        this.panier = JSON.parse(localStorage.getItem('currentPanier'));

        if( !this.panier)
        {
            this.panier = new Array <PanierLigne>();
        }

        // si deja un même produit dans le panier, on augmente la quantité
        let n = 0;
        this.panier.forEach(ligne => {
            if(ligne.idProduit == idproduit)
            {
                ligne.quantite += 1;
                n += 1;
            }
                
        });

        // sinon, on ajoute au panier
        if(n == 0) 
        {
            this.panier.push(new PanierLigne(0,0,1,idproduit, prix));
        }

        // on enregistre le panier en local
        localStorage.setItem('currentPanier', JSON.stringify(this.panier));
                 
    }

    public vide() : void {
        localStorage.removeItem('currentPanier');
    }

}