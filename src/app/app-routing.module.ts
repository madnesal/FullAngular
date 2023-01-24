import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes =[
  { path: 'products',
loadChildren: () => import('./Pages/products/products.module').then(m => m.ProductsModule)
},
{
  path: '**', redirectTo:'', pathMatch:'full'
}
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
