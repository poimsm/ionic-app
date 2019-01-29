import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TiendaNegociosPage } from './tienda-negocios';

@NgModule({
  declarations: [
    TiendaNegociosPage,
  ],
  imports: [
    IonicPageModule.forChild(TiendaNegociosPage),
  ],
})
export class TiendaNegociosPageModule {}
