import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TiendaComidaNuevoPage } from './tienda-comida-nuevo';

@NgModule({
  declarations: [
    TiendaComidaNuevoPage,
  ],
  imports: [
    IonicPageModule.forChild(TiendaComidaNuevoPage),
  ],
})
export class TiendaComidaNuevoPageModule {}
