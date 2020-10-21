import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
})
export class ConnexionComponent implements OnInit {
  utilisateur = {
    email: '',
    password: '',
  };
  message: string = '';

  constructor(
    private authentification: AuthentificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('Dans ngOnInit() du composant authentificationService');
  }
  onSubmit() {
    this.authentification
      .verificationConnexion(this.utilisateur)
      .subscribe((reponse) => {
        console.log(reponse);
        this.message = reponse['message'];
        if (reponse['resultat'] == 1) {
          this.authentification.connect(this.utilisateur.email);
          this.router.navigate(['/produits']);
        }
        // setTimeout(() => {this.router.navigate(['/produits']);

        // }, 1000);
      });
  }
}
