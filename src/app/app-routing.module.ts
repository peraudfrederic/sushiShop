import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { NavbarComponent } from './navbar.component'; // import de NavbarComponent
import { FooterComponent } from './footer.component'; // import de FooterComponent
import { HeaderComponent } from './header.component'; // import de HeaderComponent
import { TriComponent  } from './tri.component'; // import de TriComponent 
import { ShopComponent } from './shop.component'; // import de TriComponent 
import { AccueilComponent } from './accueil.component'; // import de AccueilComponent
import { ConnexionComponent } from "app/connexion.component";
import { InscriptionComponent } from "app/inscription.component";
import { DeconnexionComponent } from "app/deconnexion.component";
import { ProfilComponent } from "app/profil.component";
import { PanierComponent } from "app/panier.component";
import { DetailProduitComponent } from "app/detailProduit.component";
import { DetailCommandeComponent } from "app/detailCommande.component";

export const appRoutes: Routes = [
    {path: '', redirectTo: 'accueil', pathMatch: 'full'},
    {path: 'accueil', component: AccueilComponent},
    {path: 'connexion', component: ConnexionComponent},
    {path: 'deconnexion', component: DeconnexionComponent},    
    {path: 'inscription', component: InscriptionComponent},
    {path: 'profil', component: ProfilComponent},
    {path: 'panier', component: PanierComponent},
    {path: 'detailproduit', component: DetailProduitComponent},
    {path: 'detailcommande', component: DetailCommandeComponent}
]

@NgModule({
  imports: [
      RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { } // export pour rendre la classe "exportable"

