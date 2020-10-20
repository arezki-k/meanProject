import { Component, OnInit } from '@angular/core';
import { ProduitsService } from '../produits.service';
import { ProduitService } from '../produit.service';
import { ActivatedRoute, Params} from '@angular/router';
import { AuthentificationService} from'../authentification.service';7
import { Router } from "@angular/router";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  user:Observable<String>;
  velo;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produitsservice: ProduitsService,
    private produitservice: ProduitService,
    private authService: AuthentificationService) {
    console.log("Dans le constructeur du composant produits");
    this.user = this.authService.getUser();
    this.velo =this.produitservice.getProduit();

     }
     ngOnInit(){
      console.log("je suis dans le composant produit sans S");
      console.log(this.velo);
     }



}
