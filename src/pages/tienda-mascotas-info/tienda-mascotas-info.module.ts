import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TiendaMascotasInfoPage } from './tienda-mascotas-info';

@NgModule({
  declarations: [
    TiendaMascotasInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(TiendaMascotasInfoPage),
  ],
})
export class TiendaMascotasInfoPageModule {}
