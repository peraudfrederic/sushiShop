import { Component, OnInit } from '@angular/core'; 
import { UserService } from "app/service/user.service";

// @Component pour déclarer le composant avec un sélector, un template html et un styleUrl
@Component({
  selector: 'navbar-component',
  templateUrl: './navbar.component.html', // precise le chemin vers le template
  styleUrls: ['./navbar.component.css'] // precise le chemin vers le css
})

// export de la classe ItemComponent
export class NavbarComponent {
    // // 10.2.4 creer @Input () item qu'on va pouvoir utiliser comme référence dans le template app.component.html
    // @Input() item: Item; // on crée une entité réutilisable dans d'autres composants

    private isConnected : boolean;

    constructor(private _userService : UserService){ // _userService est injecté ici via angular

    }

    ngOnInit(): void { // ngOnInit : dès que le composant est visuellement prêt
      //this.isConnected = this._userService.isConnected();
      this._userService.isConnectedBSubject.subscribe(
          isConnected => this.isConnected=isConnected);
    }


}