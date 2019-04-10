import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TiendaMascotasPage } from './tienda-mascotas';

@NgModule({
  declarations: [
    TiendaMascotasPage,
  ],
  imports: [
    IonicPageModule.forChild(TiendaMascotasPage),
  ],
})
export class TiendaMascotasPageModule {}
