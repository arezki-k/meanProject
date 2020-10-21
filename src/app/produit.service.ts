import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

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
export class ProduitService {
  private urlBase: string = 'http://localhost:8000';
  private produit: Observable<string> = new Subject<string>();

  constructor(private http: HttpClient) {}

  getProduit() {
    return this.produit;
  }

  getProduitDetail(velo): Observable<any> {
    console.log(velo);
    return this.http.post(this.urlBase + 'produits/details', velo);
  }
  saveProduit(data) {
    this.produit = data;
  }
  unsaveProduit(data) {
    this.produit.subscribe(null);
  }
}
