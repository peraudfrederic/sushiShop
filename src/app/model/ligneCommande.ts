import { Commande } from "app/model/commande";
import { Produit } from "app/model/produit";

export class LigneCommande {
    id: number;
    id_commande: Commande;
    id_produit: Produit;
    quantite: number;
    prix: number;
    
    constructor(                
            id: number = 0,
            id_commande: Commande = new Commande(),
            id_produit: Produit = new Produit(),
            quantite: number = 0,
            prix: number = 0 ){ // par defaut public (en java, par defaut private)
        this.id = id;
        this.id_commande = id_commande;
        this.id_produit = id_produit;
        this.quantite = quantite;
        this.prix = prix;
     } 
} 