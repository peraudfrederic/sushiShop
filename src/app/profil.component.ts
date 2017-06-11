import { Component, OnInit } from '@angular/core'; 
import { UserService } from "app/service/user.service";
import { Commande } from "app/model/commande";
import { CommandeService } from "app/service/commande.service";


// @Component pour déclarer notre composant avec un sélector, un template html et un styleUrl
@Component({
  selector: 'profil-component',
  templateUrl: './profil.component.html', // precise le chemin vers le template
  styleUrls: ['./profil.component.css'] // precise le chemin vers le css
})

export class ProfilComponent implements OnInit{
  
  private name : string; // name = nom + prenom; name est stocké dans localStorage
  private id : number; // est stocké dans localStorage
  
  commandes: Commande[]; // pour preparer l'affichage de toutes les commandes (sera vu par la page html) 
 
  constructor(private _userService : UserService, private _commandeService : CommandeService){ // _userService et _commandeService sont injectés ici via angular

  }
  
  ngOnInit(): void {
    this.name = this._userService.getUserName(); // va chercher dans localStorage
    this.id = this._userService.getUserId(); // va chercher dans localStorage
    
    // TEST : afficher la liste de toutes les commandes (sans select by user)
    // pourra etre reutilisé pour l'espace Admin
    // this._commandeService.afficherAllCommandes()
    //     .subscribe(listeCom => {this.commandes = listeCom; },
    //              e => console.log(e.message)); 

    // Commande - select by User
    this._commandeService.afficherAllCommandesByUser(this.id)
        .subscribe(listeCom => {this.commandes = listeCom; },
                 e => console.log(e.message));              


  }


}