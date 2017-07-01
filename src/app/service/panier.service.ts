import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { PanierLigneWS } from "../model/panierLigneWS";
import { PanierLigneAff } from "app/model/panierLigneAff";
import { Produit } from "app/model/produit";
import {BehaviorSubject, Subject, Subscriber} from 'rxjs';
import { Observable } from 'rxjs/Observable'; // pour gérer la réponse de façon asynchrone

@Injectable() // Quand on fait un service, il est toujours @Injectable()
export class PanierService{

    private _headers = new Headers({'Content-Type': 'application/json'});

    private panierForWS : Array <PanierLigneWS>;
    private panierForAff : Array <PanierLigneAff>;
    public panierForAffBSubject : BehaviorSubject<Array <PanierLigneAff>> = new BehaviorSubject([]);

    public nombreDeProduit : number;
    public nombreDeProduitBSubject :BehaviorSubject<number> = new BehaviorSubject(0);


    constructor(private _http : Http){
        // _http injecté ici servira à appeler des WS REST

        // pour compter le nombre de produit dans un "vieux panier" à l'ouverture du site
        let temp = this.getForWS();
        let count = 0;
        if(temp)
            temp.forEach(ligne => count += 1);
        this.nombreDeProduit = count;
        this.updateNombreDeProduit();
    }


    private updateNombreDeProduit() : void {
        // on previent tout le monde
        this.nombreDeProduitBSubject.next(this.nombreDeProduit);
    }

  
    private updatePanierForAff() : void {
              // on previent tout le monde
        this.panierForAffBSubject.next(this.panierForAff);
    }

    
    public Ajouter(produit : Produit) : void {
                
        this.AjouterForWS(produit);
        this.AjouterForAff(produit);  

        // on previent tout le monde
        // l'increment du nombre de produit n'est fait qu'1 seule fois dans AjouterForWS
        this.updateNombreDeProduit();            
    }


    public vider() : void {
        localStorage.removeItem('currentPanierWS');
        localStorage.removeItem('currentPanierAff');

        // on previent tout le monde
        this.nombreDeProduit = 0;
        this.updateNombreDeProduit();
    }


    public getForWS() : Array <PanierLigneWS> {
        
        this.panierForWS = JSON.parse(localStorage.getItem('currentPanierWS'));

        // on previent tout le monde
        this.updateNombreDeProduit();

        return this.panierForWS;
    }


    public getForAff() : Array <PanierLigneAff> {
        
        this.panierForAff = JSON.parse(localStorage.getItem('currentPanierAff'));

        return this.panierForAff;
    }


    public getMontantTTC() : number {
        let montant = 0.0;
        this.panierForAff = JSON.parse(localStorage.getItem('currentPanierAff'));
        
        if(this.panierForAff) {
            this.panierForWS.forEach(ligne => {
                montant += ligne.prix * ligne.quantite;                
            });
        }

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


    public EnvoyerPanier(userID : number) : Observable<PanierLigneWS> {
        let urlWS : string = "http://localhost:8080/sushiShop/services/rest/commandes/panier";
        
        this.getForWS();
        this.panierForWS.forEach( ligne => {ligne.idUser = userID});

        return this._http.post(urlWS, JSON.stringify(this.panierForWS), {headers: this._headers}).map(response => response.json())
                        .catch(e => Observable.throw('error: '+ e));    
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
            
            // on incremente le nombre de produit
            this.nombreDeProduit += 1;
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
            if(ligne.produit.libelle == produit.libelle)
            {
                ligne.quantite += 1;
                produitDejaPresent += 1;
            }
                
        });

        // sinon, on ajoute au panier
        if(produitDejaPresent == 0) 
        {
            this.panierForAff.push(new PanierLigneAff(produit, 1));
        }

        // on enregistre le panier en local
        localStorage.setItem('currentPanierAff', JSON.stringify(this.panierForAff));
        
        // on met a jour l'affichage du panier
        this.updatePanierForAff(); 
    }


    // diminuer les quantites du produit deja ajoute au panier :
    public Retirer(produit : Produit) : void{
        
        this.RetirerForWS(produit);
        this.RetirerForAff(produit);
        this.updatePanierForAff(); // on met a jour l'affichage du panier
    }

    private RetirerForWS(produit : Produit){             

        this.panierForWS = JSON.parse(localStorage.getItem('currentPanierWS')); // on lit le panier en memoire

        console.log(this.panierForWS);

        // ou on met le panier en memoire
        if( !this.panierForWS)
        {
            this.panierForWS = new Array <PanierLigneWS>();
        }

        // on diminue la quantité
        this.panierForWS.forEach(ligne => {
            if(ligne.idProduit == produit.id)
            {
                ligne.quantite -= 1;

                if(ligne.quantite == 0){ // si en diminuant les quantites on arrive à "0 produit" dans le panier
                // splice() : methode javascript pour retirer un element du tableau
                // array.splice(2, 1): on retire 1 élément situé à l'indice 2
                this.panierForWS.splice(this.panierForWS.indexOf(ligne),1); // indexOf pour connaitre l'indice de l'element dans le tableau
                     // on previent tout le monde
                    this.nombreDeProduit -= 1;
                    this.updateNombreDeProduit();
                }
            }                
        });

        // on enregistre le panier en local
        localStorage.setItem('currentPanierWS', JSON.stringify(this.panierForWS));
    }
    
    private RetirerForAff(produit : Produit){

        this.panierForAff = JSON.parse(localStorage.getItem('currentPanierAff')); // on lit le panier en memoire
        
        // ou on met le panier en memoire
        if( !this.panierForAff)
        {
            this.panierForAff = new Array <PanierLigneAff>();
        }

        // on diminue la quantité
        this.panierForAff.forEach(ligne => {
            if(ligne.produit.libelle == produit.libelle)
            {
                ligne.quantite -= 1;
                if(ligne.quantite == 0){ // si en diminuant les quantites on arrive à "0 produit" dans le panier
                    // splice() : methode javascript pour retirer un element du tableau
                    // array.splice(2, 1): on retire 1 élément situé à l'indice 2
                    this.panierForAff.splice(this.panierForAff.indexOf(ligne),1); // indexOf pour connaitre l'indice de l'element dans le tableau
                }
            }                
        });

        // on enregistre le panier en local
        localStorage.setItem('currentPanierAff', JSON.stringify(this.panierForAff));
    }
    
}