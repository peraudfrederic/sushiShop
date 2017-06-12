import { Headers, Http, Response } from "@angular/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'; // pour gérer la réponse de façon asynchrone
import 'rxjs/add/observable/of'; // // Observable class extensions
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; 
import { Commande } from "app/model/commande";


@Injectable() // Quand on fait un service, il est toujours @Injectable()
export class CommandeService{

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
  
    // ------ Commande Select all : ------
    public afficherAllCommandes() : Observable<Commande[]> { // retour : un Observable de Commande[]
        // return Observable.of(this.listeCommandes); // simulation de WS
        let urlWS : string = "http://localhost:8080/sushiShop/services/rest/commandes/all";
        return this._http.get(urlWS).map(response => response.json())
                        .catch(e => Observable.throw('error: '+ e));    
    } 

    // ------ Commande Select by id : ------
    public afficherDetailCommande(id: number) : Observable<Commande>{
        let urlWS : string = "http://localhost:8080/sushiShop/services/rest/commandes/" + id;
        return this._http.get(urlWS).map(response => response.json())
                        .catch(e => Observable.throw('error: '+ e));          
    }

    // ------ Commande Select by User : ------
    public afficherAllCommandesByUser(id: number) : Observable<Commande[]>{
        let urlWS : string = "http://localhost:8080/sushiShop/services/rest/commandes/user/" + id;
        return this._http.get(urlWS).map(response => response.json())
                        .catch(e => Observable.throw('error: '+ e));          
    }


}