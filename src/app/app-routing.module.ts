import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes =[
{
  path: '', redirectTo:'/products', pathMatch:'full'
},
  { path: 'products',
loadChildren: () => import('./Pages/products/products.module').then(m => m.ProductsModule)
},
  { path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule) },

{
  path: '**', redirectTo:'', pathMatch: 'full'
},
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
