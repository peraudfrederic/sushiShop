export class Produit{
    id: number;
    libelle: string;
    prix: number;
    description: string;
    stock: number;
    id_promotion: number;
    id_categorie: number;
    image: string;
    image_alt: string;


    constructor(id : number = 0, 
                nom:string = "?",
                libelle:string = "?",
                prix:number = 0,
                description:string = "?",
                stock:number = 0,
                id_promotion:number = 0,
                id_categorie:number = 0,
                image:string = "?",
                image_alt:string = "?"){ // par defaut public (en java, par defaut private)
        this.id = id;
        this.libelle = libelle;
        this.prix = prix;
        this.description = description;
        this.stock = stock;
        this.id_promotion = id_promotion;
        this.id_categorie = id_categorie;
        this.image = image;
        this.image_alt = image_alt;
     } 


     // pour animation
     // animation sur boton Ajouter :
      public toggle: boolean;
      public statut : any;
    
      public toggleState() {
        this.toggle = !this.toggle;
        this.statut = this.toggle ? 'active':'inactive';
      }
      // fin animation
} 