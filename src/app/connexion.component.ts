import { Component, OnInit } from '@angular/core'; 
import { User } from "app/model/user";
import { UserService } from "app/service/user.service";
import { Router, ActivatedRoute } from '@angular/router'; 

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
    returnUrl: string;
    redirectionMsg : String;

    constructor(private _userService : UserService, private _router: Router, private _route: ActivatedRoute){ // _userService est injecté ici via angular

    }

    ngOnInit(): void { // ngOnInit : dès que le composant est visuellement prêt
      this.user = new User();
      this.errorMsg = "";

      // get return url from route parameters or default to '/'
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';

      // on s'abonne pour être notifier à chaque changement de la variable isAdmin qui viendrait d'une autre page
      this._userService.redirectionMsgBSubject.subscribe(redirectionMsg => this.redirectionMsg=redirectionMsg);
    }

    onConnecterUseur(): void {
      this._userService.connecterUser(this.user).subscribe(
        usr => {
                //this._router.navigate(['/accueil']);
                this._router.navigate([this.returnUrl]);
                this.errorMsg = "";
                if (usr) { // store user details in local storage to keep user logged in between page refreshes
                    //localStorage.setItem('currentUser', JSON.stringify(usr));
                    this._userService.storeLocalUser(usr);
                } },
                 e => { console.log(e.message); this.errorMsg = "Erreur lors de la connection. Merci de vérifier vos identifiants" });
    }

}