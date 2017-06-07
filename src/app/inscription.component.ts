import { Component, OnInit } from '@angular/core'; 
import { User } from "app/model/user";
import { UserService } from "app/service/user.service";
import { Router } from '@angular/router';

// @Component pour déclarer notre composant avec un sélector, un template html et un styleUrl
@Component({
  selector: 'inscription-component',
  templateUrl: './inscription.component.html', // precise le chemin vers le template
  styleUrls: ['./inscription.component.css'] // precise le chemin vers le css
})

export class InscriptionComponent {
    // // 10.2.4 creer @Input () item qu'on va pouvoir utiliser comme référence dans le template app.component.html
    // @Input() item: Item; // on crée une entité réutilisable dans d'autres composants

    user : User;
    errorMsg : String;

    constructor(private _userService : UserService, private _router: Router){ // _userService est injecté ici via angular

    }

    ngOnInit(): void { // ngOnInit : dès que le composant est visuellement prêt
      this.user = new User();
      this.user.isAdmin = 0;
      this.errorMsg = "";
    }

    onInscrireUseur(): void {
      this._userService.inscrireUser(this.user).subscribe(
        usr => {this._router.navigate(['/connexion']); this.errorMsg = ""; },
                 e => { console.log(e.message); this.errorMsg = "Erreur lors de l'inscription. Merci de réessayer ulterieurement" });
    }

}