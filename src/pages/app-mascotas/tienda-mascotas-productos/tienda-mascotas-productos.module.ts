import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TiendaMascotasProductosPage } from './tienda-mascotas-productos';

@NgModule({
  declarations: [
    TiendaMascotasProductosPage,
  ],
  imports: [
    IonicPageModule.forChild(TiendaMascotasProductosPage),
  ],
})
export class TiendaMascotasProductosPageModule {}
