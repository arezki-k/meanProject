import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProduitsComponent } from './produits/produits.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { CategorieComponent } from './categorie/categorie.component';
import { MenuComponent } from './menu/menu.component';
import { ProduitComponent } from './produit/produit.component';

const routes: Routes = [
{
  path : 'produits', component: ProduitsComponent
},
{
  path : 'connexion', component : ConnexionComponent
},
{
  path : 'inscription', component : InscriptionComponent
},
{
  path : 'categorie', component : CategorieComponent
},
{
  path : 'produits/:categorie', component : ProduitsComponent
},
{
  path : 'produit', component : ProduitComponent
},

{
  path : 'menu', component : MenuComponent
},
{
  path : 'panier', component : MenuComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
