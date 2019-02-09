import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TiendaComidaProductosPage } from './tienda-comida-productos';

@NgModule({
  declarations: [
    TiendaComidaProductosPage,
  ],
  imports: [
    IonicPageModule.forChild(TiendaComidaProductosPage),
  ],
})
export class TiendaComidaProductosPageModule {}
