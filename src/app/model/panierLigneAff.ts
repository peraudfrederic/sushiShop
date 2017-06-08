export class PanierLigneAff{

    libelle : string;
    quantite : number;
    prix : number;
    montant : number;

    constructor(nomProduit : string, 
                quantite : number = 0,
                prix : number
                ){
        this.libelle = nomProduit;
        this.prix = prix;
        this.quantite = quantite;
        this.montant = this.prix * this.quantite;
     } 

}