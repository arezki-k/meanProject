import { ProduitService } from './../produit.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { ProduitsService } from '../produits.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
})
export class PanierComponent implements OnInit {
  user: Observable<string>;
  panier;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private authentification: AuthentificationService,
    private ProduitsService: ProduitsService,
    private router: Router
  ) {
    this.user = this.authentification.getUser();
    // this.panier = this.ProduitsService.getPanier(this.user);
  }

  ngOnInit(): void {
    this.ProduitsService.getPanierParUser(this.user['_value']).subscribe(
      (panier) => {
        this.panier = panier;
        console.log(panier);
      }
    );
  }

  supprimer(id) {
    console.log('je veux supprimer un article' + id);
    this.ProduitsService.supprimerArticlePanier(id).subscribe((doc) => {
      console.log(doc);
    });
    this.ProduitsService.getPanierParUser(this.user['_value']).subscribe(
      (panier) => {
        this.panier = panier;
        console.log(panier);
      }
    );
    this.router.navigate(['/panier']);
  }
}
