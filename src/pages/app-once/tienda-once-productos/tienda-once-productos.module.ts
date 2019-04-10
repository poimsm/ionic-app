import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TiendaOnceProductosPage } from './tienda-once-productos';

@NgModule({
  declarations: [
    TiendaOnceProductosPage,
  ],
  imports: [
    IonicPageModule.forChild(TiendaOnceProductosPage),
  ],
})
export class TiendaOnceProductosPageModule {}
