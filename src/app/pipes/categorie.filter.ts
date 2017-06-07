import {Pipe, PipeTransform} from '@angular/core'; // imports de Pipe et PipeTransform 

@Pipe({ // @Pipe = décorateur; 13.1.2 déclarer @Pipe
    name: 'categorieFilter',
    pure: false // à la moindre modif à l'écran, l'ensemble des composants est relu (à utiliser avec modération car consomme des ressources) 

})

export class CategoriePipe implements PipeTransform{
   
    transform(value: any, ...args: any[]): any { // utilisation methode transform dans la classe ItemPipe
        //console.log(value);
        //console.log(args[0]);
        let filtre = args[0].toLowerCase(); // passer en minuscules
        // return tableau à partir de la collection filtrée
        // return filtre ? value.filter(produitTrie => produitTrie.libelle.toLowerCase().indexOf(filtre) != -1) : value; // fonction filter() de javascript
        return filtre ? value.filter(produitTrie => produitTrie.id_categorie.toLowerCase().indexOf(filtre) != -1) : value; // fonction filter() de javascript    
        
    }
}