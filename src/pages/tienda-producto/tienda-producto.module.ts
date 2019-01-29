import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TiendaProductoPage } from './tienda-producto';

@NgModule({
  declarations: [
    TiendaProductoPage,
  ],
  imports: [
    IonicPageModule.forChild(TiendaProductoPage),
  ],
})
export class TiendaProductoPageModule {}
