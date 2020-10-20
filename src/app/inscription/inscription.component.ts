import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../authentification.service'
import {Router} from '@angular/router';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {


  utilisateur={
    "nom":"",
    "prenom":"",
    "email":"",
    "password":""

  }
  message : "";

  constructor(
    private authentification : AuthentificationService,
    private router : Router,
  ) { }
  onSubmit(){
    this.authentification.inscription(this.utilisateur).subscribe(reponse=>{
      this.message = reponse['message'];
      this.authentification.connect(this.utilisateur.email);
      this.router.navigate(['/produits']);
    });
    
  }
    

  ngOnInit(): void {
    console.log("Dans ngOnInit() du composant inscription");

  }

}
