import { Component, OnInit } from '@angular/core'; 
import { User } from "app/model/user";
import { UserService } from "app/service/user.service";
import { Router } from '@angular/router';
import { PanierService } from "app/service/panier.service";
import { PanierLigneWS } from "app/model/panierLigneWS";

// @Component pour déclarer notre composant avec un sélector, un template html et un styleUrl
@Component({
  selector: 'paiement-component',
  templateUrl: './paiement.component.html', // precise le chemin vers le template
  styleUrls: ['./paiement.component.css'] // precise le chemin vers le css
})

export class PaiementComponent {
    // // 10.2.4 creer @Input () item qu'on va pouvoir utiliser comme référence dans le template app.component.html
    // @Input() item: Item; // on crée une entité réutilisable dans d'autres composants

    private panierForWS : Array <PanierLigneWS>;
    private errorMsg : String;

    constructor(private _panierService : PanierService, private _userService : UserService, private _router: Router){ 

    }

    ngOnInit(): void { // ngOnInit : dès que le composant est visuellement prêt
      this.panierForWS = this._panierService.getForWS();
    }

    private onValiderPaiement() : void {
      // mettre l'id user connecter
      let userID = this._userService.getUserId();
      this.panierForWS.forEach( ligne => {ligne.idUser = userID});

      // appel webservice pour persister la commande
      this._panierService.EnvoyerPanier().subscribe(
        pnr => {this._router.navigate(['/accueil']); this.errorMsg = ""; },
                 e => { console.log(e.message); this.errorMsg = "Erreur lors du paiement. Merci de réessayer ulterieurement" });

    }

}