import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TiendaComidaPage } from './tienda-comida';

@NgModule({
  declarations: [
    TiendaComidaPage,
  ],
  imports: [
    IonicPageModule.forChild(TiendaComidaPage),
  ],
})
export class TiendaComidaPageModule {}
