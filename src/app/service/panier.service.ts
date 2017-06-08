import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { PanierLigneWS } from "../model/panierLigneWS";
import { PanierLigneAff } from "app/model/panierLigneAff";
import { Produit } from "app/model/produit";

@Injectable() // Quand on fait un service, il est toujours @Injectable()
export class PanierService{

    private _headers = new Headers({'Content-Type': 'application/json'});

    private panierForWS : Array <PanierLigneWS>;
    private panierForAff : Array <PanierLigneAff>;

    constructor(private _http : Http){
        // _http injecté ici servira à appeler des WS REST
    }
    
    
    public Ajouter(produit : Produit) : void {
                
        this.AjouterForWS(produit);
        this.AjouterForAff(produit);        
    }

    public vider() : void {
        localStorage.removeItem('currentPanierWS');
        localStorage.removeItem('currentPanierAff');
    }

    public getForWS() : Array <PanierLigneWS> {
        
        this.panierForWS = JSON.parse(localStorage.getItem('currentPanierWS'));

        return this.panierForWS;
    }

    public getForAff() : Array <PanierLigneAff> {
        
        this.panierForAff = JSON.parse(localStorage.getItem('currentPanierAff'));

        return this.panierForAff;
    }


    private AjouterForWS(produit : Produit) : void {
    
        // on lit le panier en memoire
        this.panierForWS = JSON.parse(localStorage.getItem('currentPanierWS'));

        // ou on le panier en memoire
        if( !this.panierForWS)
        {
            this.panierForWS = new Array <PanierLigneWS>();
        }

        // si deja un même produit dans le panier, on augmente la quantité
        let produitDejaPresent = 0;
        this.panierForWS.forEach(ligne => {
            if(ligne.idProduit == produit.id)
            {
                ligne.quantite += 1;
                produitDejaPresent += 1;
            }
                
        });

        // sinon, on ajoute au panier
        if(produitDejaPresent == 0) 
        {
            this.panierForWS.push(new PanierLigneWS(0,0,produit.id,1, produit.prix));
        }

        // on enregistre le panier en local
        localStorage.setItem('currentPanierWS', JSON.stringify(this.panierForWS));
    }

    private AjouterForAff(produit : Produit) : void {
    
        this.panierForAff = JSON.parse(localStorage.getItem('currentPanierAff'));

        if( !this.panierForAff)
        {
            this.panierForAff = new Array <PanierLigneAff>();
        }

        // si deja un même produit dans le panier, on augmente la quantité
        let produitDejaPresent = 0;
        this.panierForAff.forEach(ligne => {
            if(ligne.libelle == produit.libelle)
            {
                ligne.quantite += 1;
                produitDejaPresent += 1;
            }
                
        });

        // sinon, on ajoute au panier
        if(produitDejaPresent == 0) 
        {
            this.panierForAff.push(new PanierLigneAff(produit.libelle, 1, produit.prix));
        }

        // on enregistre le panier en local
        localStorage.setItem('currentPanierAff', JSON.stringify(this.panierForAff));
    }


}