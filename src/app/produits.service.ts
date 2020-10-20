import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

const httpOptions = {
  headers : new HttpHeaders({
    'Access-Control-allow-Methods': 'GET,POST,DELETE,UPDATE',
    'Access-Control-allow-headers': 'Content-Type',
    'Access-Control-allow-Origin' : '*',
    'Content-type': 'Application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  private urlBase:string = 'http://localhost:8000/';

  constructor( private http: HttpClient) {}
  
  getProduits(): Observable<any>{
    return this.http.get(this.urlBase + 'produits');
  }

  getCategorie():Observable<any>{
    return this.http.get(this.urlBase + 'categorie/')
  }
  getProduitsParModel(model): Observable<any>{
    return this.http.get(this.urlBase + 'produits/' + model);
  }
  getProduitsParCategorie(categorie): Observable<any>{
    return this.http.get(this.urlBase +'produits/'+ categorie);
  }
  getProduitDetail(velo): Observable<any>{
    console.log(velo);
    return this.http.post(this.urlBase+ 'produits/details',velo );
  }

}
