import { Component, OnInit } from '@angular/core'; 
import { User } from "app/model/user";
import { UserService } from "app/service/user.service";
import { Router } from '@angular/router'; 

// @Component pour déclarer notre composant avec un sélector, un template html et un styleUrl
@Component({
  selector: 'connexion-component',
  templateUrl: './connexion.component.html', // precise le chemin vers le template
  styleUrls: ['./connexion.component.css'] // precise le chemin vers le css
})

export class ConnexionComponent {
    // // 10.2.4 creer @Input () item qu'on va pouvoir utiliser comme référence dans le template app.component.html
    // @Input() item: Item; // on crée une entité réutilisable dans d'autres composants

    user : User;
    errorMsg : String;

    constructor(private _userService : UserService, private _router: Router){ // _userService est injecté ici via angular

    }

    ngOnInit(): void { // ngOnInit : dès que le composant est visuellement prêt
      this.user = new User();
      this.errorMsg = "";
    }

    onConnecterUseur(): void {
      this._userService.connecterUser(this.user).subscribe(
        usr => {this._router.navigate(['/accueil']); this.errorMsg = "";
                    if (usr) { // store user details in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(usr));
                } },
                 e => { console.log(e.message); this.errorMsg = "Erreur lors de la connection. Merci de vérifier vos identifiants" });
    }

}