import { Component } from '@angular/core'; 

// @Component pour déclarer notre composant avec un sélector, un template html et un styleUrl
@Component({
  selector: 'accueil-component',
  templateUrl: './accueil.component.html', // precise le chemin vers le template
  styleUrls: ['./accueil.component.css'] // precise le chemin vers le css
})

export class AccueilComponent {
    // // 10.2.4 creer @Input () item qu'on va pouvoir utiliser comme référence dans le template app.component.html
    // @Input() item: Item; // on crée une entité réutilisable dans d'autres composants
}