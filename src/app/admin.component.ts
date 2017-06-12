import { Component, OnInit } from '@angular/core'; 
import { UserService } from "app/service/user.service";
import { Commande } from "app/model/commande";
import { CommandeService } from "app/service/commande.service";


// @Component pour déclarer notre composant avec un sélector, un template html et un styleUrl
@Component({
  selector: 'admin-component',
  templateUrl: './admin.component.html', // precise le chemin vers le template
  styleUrls: ['./admin.component.css'] // precise le chemin vers le css
})

export class AdminComponent implements OnInit{
  
  private name : string; // name = nom + prenom; name est stocké dans localStorage
  private id : number; // est stocké dans localStorage
  
  commandes: Commande[]; // pour preparer l'affichage de toutes les commandes (sera vu par la page html) 
 
  constructor(private _userService : UserService, private _commandeService : CommandeService){ // _userService et _commandeService sont injectés ici via angular

  }
  
  ngOnInit(): void {
    this.name = this._userService.getUserName(); // va chercher dans localStorage
    
    this._commandeService.afficherAllCommandes()
         .subscribe(listeCom => {this.commandes = listeCom; },
                  e => console.log(e.message)); 

    // Commande - select by User
    /*this._commandeService.afficherAllCommandesByUser(this.id)
        .subscribe(listeCom => {this.commandes = listeCom; },
                 e => console.log(e.message));              
    */

  }


}