import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TiendaMueblesPage } from './tienda-muebles';

@NgModule({
  declarations: [
    TiendaMueblesPage,
  ],
  imports: [
    IonicPageModule.forChild(TiendaMueblesPage),
  ],
})
export class TiendaMueblesPageModule {}
