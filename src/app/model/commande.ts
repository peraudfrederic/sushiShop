import { User } from "app/model/user";
import { LigneCommande } from "app/model/ligneCommande";

export class Commande {
    id: number;
    id_user : User;
    date : Date;
    lignesCommande: LigneCommande[];

    constructor(
                id: number = 0,
                id_user : User = new User(),
                date : Date = null,
                lignesCommande: LigneCommande[] = new Array()){ // par defaut public (en java, par defaut private)
        this.id = id;
        this.id_user = id_user;
        this.date = date;
        this.lignesCommande = lignesCommande;
     } 
} 