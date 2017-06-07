import { User } from "../model/user";
import { Headers, Http, Response } from "@angular/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'; // pour gérer la réponse de façon asynchrone
import 'rxjs/add/observable/of'; // // Observable class extensions
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; 

@Injectable() // Quand on fait un service, il est toujours @Injectable()
export class UserService{

    private _headers = new Headers({'Content-Type': 'application/json'});

    constructor(private _http : Http){
        // _http injecté ici servira à appeler des WS REST
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
        localStorage.removeItem('currentUser');    
    }

}