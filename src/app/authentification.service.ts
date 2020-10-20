import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Subject, BehaviorSubject, Observable} from 'rxjs';



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
export class AuthentificationService {

  private baseUrl: string = 'http://localhost:8000/membres/';
  private user: Subject<string> = new BehaviorSubject<string>(undefined);
  constructor( private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getUser(){
    return this.user;
  }

  // tslint:disable-next-line:typedef
  connect(data: string){
    this.user.next(data);
  }

  // tslint:disable-next-line:typedef
  disconnect(){
    this.user.next(null);
  }

  verificationConnexion(identifiants): Observable<any>{
    return this.http.post(this.baseUrl + 'connexion',
      JSON.stringify(identifiants),
      httpOptions);
  }

  inscription(user): Observable<any>{
    return this.http.post(this.baseUrl + 'inscription',
      JSON.stringify(user),
      httpOptions);

  }




}
