import { Produit } from "app/model/produit";

export class PanierLigneAff {
    produit : Produit;
    quantite : number;
    montant : number;

    constructor(produit : Produit, quantite : number = 0){
        this.produit = produit;
        this.quantite = quantite;
        this.montant = this.produit.prix * this.quantite;
     } 

}