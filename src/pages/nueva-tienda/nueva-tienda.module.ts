import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevaTiendaPage } from './nueva-tienda';

@NgModule({
  declarations: [
    NuevaTiendaPage,
  ],
  imports: [
    IonicPageModule.forChild(NuevaTiendaPage),
  ],
})
export class NuevaTiendaPageModule {}
