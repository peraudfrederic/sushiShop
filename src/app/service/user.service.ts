import { User } from "../model/user";
import { Headers, Http, Response } from "@angular/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'; // pour gérer la réponse de façon asynchrone
import 'rxjs/add/observable/of'; // // Observable class extensions
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; 
import {BehaviorSubject, Subject, Subscriber} from 'rxjs';

@Injectable() // Quand on fait un service, il est toujours @Injectable()
export class UserService{
    
    private _headers = new Headers({'Content-Type': 'application/json'});

    public isConnected : boolean;
    public isConnectedBSubject :BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(private _http : Http){
        // _http injecté ici servira à appeler des WS REST
        //this.isConnected = this.isConnected();
    }

    public inscrireUser (user : User) : Observable<User> { // retour : un Observable de User[]
        
        let urlWS : string = "http://localhost:8080/sushiShop/services/rest/users/";
        
        return this._http.post(urlWS, JSON.stringify(user), {headers: this._headers}).map(response => response.json())
                        .catch(e => Observable.throw('error: '+ e)); 
        /*let urlWS : string = "http://localhost:8080/sushiShop/services/rest/users/all";
        return this._http.get(urlWS).map(response => response.json())
                        .catch(e => Observable.throw('error: '+ e)); */  
    } 

    public connecterUser (user : User) : Observable<User> { // retour : un Observable de User[]
        
        let urlWS : string = "http://localhost:8080/sushiShop/services/rest/users/";
        

        return this._http.put(urlWS, JSON.stringify(user), {headers: this._headers}).map(response => response.json())
                        .catch(e => Observable.throw('error: '+ e));    
    }

    public deconnecterUser () : void {
        
        //let urlWS : string = "http://localhost:8080/sushiShop/services/rest/users/";
        
        /*return this._http.put(urlWS, JSON.stringify(user), {headers: this._headers}).map(response => response.json())
                        .catch(e => Observable.throw('error: '+ e));*/

        // remove user from local storage to log user out
        this.unstoreLocalUser();    
    }

    public storeLocalUser(usr : User) {
        if (usr) { // store user details in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(usr));
        }

        this.updateIsUserConnected();
        //this.isConnected2 = this.isConnected();
    }

    public unstoreLocalUser() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');

        this.updateIsUserConnected();
    }

    private updateIsUserConnected() : void {
        let isConnected = false;
        // on relit le localstorage pour s'assurer qu'il a bien été enregistré
        let usr = JSON.parse(localStorage.getItem('currentUser'));
        // on verifit qu'un "user est valide"
        if(usr && usr.mdp != "")
            isConnected = true;

        // on previent tous le monde du changement
        this.isConnected = isConnected;
        this.isConnectedBSubject.next(this.isConnected);
    }

    public getUserName() : string {
        let name = "";
        let usr = JSON.parse(localStorage.getItem('currentUser'));
        if(usr)
            name = usr.prenom + " " + usr.nom;

        return name;
    }

    public getUserId() : number {
        let id = 0;
        let usr = JSON.parse(localStorage.getItem('currentUser'));
        if(usr)
            id = usr.id;

        return id;
    }

}