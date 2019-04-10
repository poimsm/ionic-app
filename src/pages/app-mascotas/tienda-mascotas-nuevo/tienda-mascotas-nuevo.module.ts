import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TiendaMascotasNuevoPage } from './tienda-mascotas-nuevo';

@NgModule({
  declarations: [
    TiendaMascotasNuevoPage,
  ],
  imports: [
    IonicPageModule.forChild(TiendaMascotasNuevoPage),
  ],
})
export class TiendaMascotasNuevoPageModule {}
