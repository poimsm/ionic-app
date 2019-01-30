import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TiendaEcommercePage } from './tienda-ecommerce';

@NgModule({
  declarations: [
    TiendaEcommercePage,
  ],
  imports: [
    IonicPageModule.forChild(TiendaEcommercePage),
  ],
})
export class TiendaEcommercePageModule {}
