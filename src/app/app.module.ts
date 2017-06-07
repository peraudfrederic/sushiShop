import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar.component'; 
import { FooterComponent } from './footer.component'; 
import { HeaderComponent } from './header.component'; 
import { TriComponent  } from './tri.component'; 
import { ShopComponent } from './shop.component'; 
import { AccueilComponent } from './accueil.component'; 
import { ConnexionComponent } from './connexion.component'; 
import { InscriptionComponent } from "app/inscription.component"; 
import { DeconnexionComponent } from "app/deconnexion.component"; 
import { AppRoutingModule } from "app/app-routing.module";
import { ProfilComponent } from "app/profil.component";
import { PanierComponent } from "app/panier.component";
import { DetailProduitComponent } from "app/detailProduit.component";
import { DetailCommandeComponent } from "app/detailCommande.component";
import { ProduitService } from "app/service/produit.service";
import { UserService } from "app/service/user.service";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent, 
    FooterComponent, 
    HeaderComponent, 
    TriComponent, 
    ShopComponent, 
    AccueilComponent,     
    ConnexionComponent, 
    InscriptionComponent, 
    DeconnexionComponent, 
    ProfilComponent,  
    PanierComponent,
    DetailProduitComponent,
    DetailCommandeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
	  AppRoutingModule // on importe AppRoutingModule
  ],
  providers: [ProduitService,
              UserService], // ajout de ProduitService (sinon ne sera pas injecté)
  bootstrap: [AppComponent]
})
export class AppModule { }
