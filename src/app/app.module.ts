import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar.component'; 
import { FooterComponent } from './footer.component'; 
import { HeaderComponent } from './header.component'; 
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
import { MotClePipe } from "app/pipes/motCle.filter";
import { CategoriePipe } from "app/pipes/categorie.filter";
import { PanierService } from "app/service/panier.service";
import { PaiementComponent } from "app/paiement.component";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent, 
    FooterComponent, 
    HeaderComponent, 
    ShopComponent, 
    AccueilComponent,     
    ConnexionComponent, 
    InscriptionComponent, 
    DeconnexionComponent, 
    ProfilComponent,  
    PanierComponent,
    DetailProduitComponent,
    DetailCommandeComponent,
    PaiementComponent,
    MotClePipe, // filtre
    CategoriePipe // filtre
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
	  AppRoutingModule, // on importe AppRoutingModule
    BrowserAnimationsModule
  ],
  providers: [ProduitService, // ajout de ProduitService (sinon ne sera pas injecté)
              UserService,
              PanierService],
  bootstrap: [AppComponent]
})
export class AppModule { }
