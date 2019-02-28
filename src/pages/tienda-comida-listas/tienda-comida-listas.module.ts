import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TiendaComidaListasPage } from './tienda-comida-listas';

@NgModule({
  declarations: [
    TiendaComidaListasPage,
  ],
  imports: [
    IonicPageModule.forChild(TiendaComidaListasPage),
  ],
})
export class TiendaComidaListasPageModule {}
