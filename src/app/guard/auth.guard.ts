import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from "app/service/user.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private _userService : UserService) { 
        
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this._userService.isConnected) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/connexion'], { queryParams: { returnUrl: state.url }});
        this._userService.updateRedirectionMsg("votre dernière action requiert d'être connecté");
        return false;
    }
}