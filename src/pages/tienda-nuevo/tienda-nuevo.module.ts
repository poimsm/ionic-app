import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TiendaNuevoPage } from './tienda-nuevo';

@NgModule({
  declarations: [
    TiendaNuevoPage,
  ],
  imports: [
    IonicPageModule.forChild(TiendaNuevoPage),
  ],
})
export class TiendaNuevoPageModule {}
