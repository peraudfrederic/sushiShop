export class User{
    id: number;
    nom: string;
    prenom: string;
    email: string;
    mdp: string;
    isAdmin: number;

    constructor(id : number = 0, 
                nom:string = "",
                prenom: string = "",
                email: string = "",
                mdp: string = "",
                isAdmin: number = 0){ // par defaut public (en java, par defaut private)
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.mdp = mdp;
        this.isAdmin = isAdmin;
     } 
} 