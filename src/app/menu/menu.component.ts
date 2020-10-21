import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  user: Observable<string>;

  constructor(
    private authentification: AuthentificationService,
    private router: Router
  ) {
    this.user = this.authentification.getUser();
    // console.log('user: **********'+this.authentification.getUser());
  }
  ngOnInit(): void {
    this.router.navigate(['/produits']);
    //console.log('user: **********'+this.authentification.getUser());
  }
  disconnect() {
    this.authentification.disconnect();
    this.router.navigate(['/produits']);
  }
}
