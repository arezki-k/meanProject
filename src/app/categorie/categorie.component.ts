import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { AuthentificationService } from '../authentification.service';
import { Router } from '@angular/router';
import { ProduitsService } from '../produits.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css'],
})
export class CategorieComponent implements OnInit {
  user: Observable<string>;
  categories: String[] = new Array();

  constructor(
    private router: Router,
    private AuthentificationService: AuthentificationService,
    private produitsService: ProduitsService
  ) {
    this.user = this.AuthentificationService.getUser();
  }

  ngOnInit(): void {
    this.produitsService.getCategorie().subscribe((categories) => {
      this.categories = categories;
    });
  }

  produitsParCategorie(categorie) {
    this.router.navigate(['/produits', categorie]);
  }
}
