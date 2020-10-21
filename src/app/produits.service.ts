import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-allow-Methods': 'GET,POST,DELETE,UPDATE',
    'Access-Control-allow-headers': 'Content-Type',
    'Access-Control-allow-Origin': '*',
    'Content-type': 'Application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ProduitsService {
  private panier: Subject<any> = new BehaviorSubject<any>(undefined);
  private urlBase: string = 'http://localhost:8000/';

  constructor(private http: HttpClient) {}

  getPanier(user) {
    return this.http.get(this.urlBase + 'panier/' + user);
  }

  ajouterPanier(data) {
    return this.http.post(this.urlBase + 'panier', data);
  }

  savePanier(data) {
    this.panier.next(data);
  }

  getProduits(): Observable<any> {
    return this.http.get(this.urlBase + 'produits');
  }

  getCategorie(): Observable<any> {
    return this.http.get(this.urlBase + 'categorie/');
  }
  getProduitsParModel(model): Observable<any> {
    return this.http.get(this.urlBase + 'produits/' + model);
  }
  getProduitsParCategorie(categorie): Observable<any> {
    return this.http.get(this.urlBase + 'produits/' + categorie);
  }
  getProduitDetail(velo): Observable<any> {
    console.log(velo);
    return this.http.post(this.urlBase + 'produits/details', velo);
  }
  getPanierParUser(user) {
    console.log('getPanierParUSer() avec: ' + user);
    return this.http.get(this.urlBase + 'panier/' + user);
  }
  supprimerArticlePanier(id) {
    console.log('dans supprimer un article du panier');
    return this.http.get(this.urlBase + 'panier/supprimer/' + id);
  }
}
