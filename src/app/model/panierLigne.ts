export class PanierLigne{

    id : number;
    idCommande : number;
    idProduit : number;
    quantite : number;
    prix : number;

    constructor(id : number = 0, 
                idCommande : number = 0,
                quantite : number = 0,
                idProduit : number,
                prix : number
                ){
        this.id = id;
        this.idCommande = idCommande;
        this.prix = prix;
        this.quantite = quantite;
        this.idProduit = idProduit;
     } 

}