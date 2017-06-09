import { Component } from '@angular/core'; 
import { UserService } from "app/service/user.service";


// @Component pour déclarer notre composant avec un sélector, un template html et un styleUrl
@Component({
  selector: 'profil-component',
  templateUrl: './profil.component.html', // precise le chemin vers le template
  styleUrls: ['./profil.component.css'] // precise le chemin vers le css
})

export class ProfilComponent {
  
  private name : string;

  constructor(private _userService : UserService){ // _userService est injecté ici via angular

  }
  
  ngOnInit(): void {
    this.name = this._userService.getUserName();
  }


}