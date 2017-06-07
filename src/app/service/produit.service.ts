import { Produit } from "../model/produit";
import { Headers, Http, Response } from "@angular/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'; // pour gérer la réponse de façon asynchrone
import 'rxjs/add/observable/of'; // // Observable class extensions
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; 


@Injectable() // Quand on fait un service, il est toujours @Injectable()
export class ProduitService{

    /* private listeProduits : Produit[]; // jeux de données en privée pour la simulation de WS

    constructor(){
        this.listeProduits = [
            { "id" : 1, "libelle" : "sushi", "prix": 3.5 },
            { "id" : 2, "libelle" : "maki", "prix": 4.9 }
        ];
    } */ 
    
     private _headers = new Headers({'Content-Type': 'application/json'});

    constructor(private _http : Http){
        // _http injecté ici servira à appeler des WS REST
    }
    
    public produitSelectionne(p : Produit) : Observable<Produit>{
        let urlWS : string = "http://localhost:8080/sushiShop/services/rest/produits/" + p.id;
        return this._http.put(urlWS, JSON.stringify(p), {headers: this._headers})
                         .map(response => response.json()) // stringify : pour transformer en json l'objet auteur
                         .catch(e => Observable.throw('error: '+ e));         
    }

    public rechercherAllProduits() : Observable<Produit[]> { // retour : un Observable de Produit[]
        // return Observable.of(this.listeProduits); // simulation de WS
        let urlWS : string = "http://localhost:8080/sushiShop/services/rest/produits/all";
        return this._http.get(urlWS).map(response => response.json())
                        .catch(e => Observable.throw('error: '+ e));    
    } 

}