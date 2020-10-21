import { Component, OnInit } from '@angular/core';
import { ProduitsService } from '../produits.service';
import { ProduitService } from '../produit.service';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
7;
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css'],
})
export class ProduitComponent implements OnInit {
  user: Observable<String>;
  velo;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produitsservice: ProduitsService,
    private produitservice: ProduitService,
    private authService: AuthentificationService
  ) {
    console.log('Dans le constructeur du composant produits');
    this.user = this.authService.getUser();
    this.velo = this.produitservice.getProduit();
  }
  ngOnInit() {
    console.log('je suis dans le composant produit sans S');
    console.log(this.velo);
  }
  ajoutPanier(produit) {
    console.log(produit);
    let produitPanier = {
      email: this.user['_value'],
      id: Math.random().toString(36).substr(2, 9),
      brand: produit['brand'],
      model: produit['model'],
      category: produit['category'],
      desciption: produit['description'],
      image: produit['image'],
      price: produit['price'],
    };
    this.produitsservice.ajouterPanier(produitPanier).subscribe((Res) => {
      console.log('produit ajouté au panier' + Res);
    });
    console.log(produitPanier);
  }
  bonjour() {
    console.log('bonjour je suis dans produit');
  }
}
