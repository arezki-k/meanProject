import { Component, OnInit } from '@angular/core';
import { ProduitsService } from '../produits.service';
import { ProduitService } from "../produit.service";
import { ActivatedRoute, Params, Router} from '@angular/router';
import { AuthentificationService} from'../authentification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  p: number = 1;
	numPage :number =1; 
  selectedNumber:number = 6;
  user:Observable<any>;
  produits : Object[] = new Array();

  constructor(
    private route: ActivatedRoute,
    private router : Router,
    private produitservice: ProduitsService,
    private DetailsService: ProduitService,
    private authService: AuthentificationService) {
    console.log("Dans le constructeur du composant produits");
    this.user = this.authService.getUser();

     }

  ngOnInit() {

    this.route.params.subscribe((params :Params)=>{
      if(params["categorie"] !== undefined){
        this.produitservice.getProduitsParCategorie(params["categorie"]).subscribe(produits =>{
          this.produits = produits;
        });
      }else{
        console.log("dans ngOnInit() du composant porduits");

        this.produitservice.getProduits().subscribe(data =>{
          this.produits = data;
        } );
      }
    });

  }
  getProduitDetail(velo){
    console.log(velo);
    this.DetailsService.saveProduit(velo);
    this.router.navigate(['/produit']);
    console.log(this.DetailsService.getProduit());
    };

  


}
