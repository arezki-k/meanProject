import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
//services
import { ProduitsService } from './produits.service';
import { AppRoutingModule } from './app-routing.module';
import { AuthentificationService } from './authentification.service';
import { ProduitService } from './produit.service';

//modules
import { AppComponent } from './app.component';
import { ProduitsComponent } from './produits/produits.component';
import { MenuComponent } from './menu/menu.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { CategorieComponent } from './categorie/categorie.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { PanierComponent } from './panier/panier.component';
import { ProduitComponent } from './produit/produit.component';

@NgModule({
  declarations: [
    AppComponent,
    ProduitsComponent,
    MenuComponent,
    ConnexionComponent,
    CategorieComponent,
    InscriptionComponent,
    PanierComponent,
    ProduitComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
  ],
  providers: [ProduitsService, AuthentificationService, ProduitService],
  bootstrap: [AppComponent],
})
export class AppModule {}
