import { Produit } from "app/model/produit";

export class PanierLigneAff {
    
    id : number;
    libelle : string;
    quantite : number;
    prix : number;
    montant : number;
    produit : Produit;

    constructor(id :  number,
                nomProduit : string, 
                quantite : number = 0,
                prix : number,
                produit : Produit
                ){
        this.id = id;
        this.libelle = nomProduit;
        this.prix = prix;
        this.quantite = quantite;
        this.montant = this.prix * this.quantite;
        this.produit = produit;
     } 

}