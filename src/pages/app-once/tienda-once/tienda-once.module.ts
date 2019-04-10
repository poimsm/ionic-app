import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TiendaOncePage } from './tienda-once';

@NgModule({
  declarations: [
    TiendaOncePage,
  ],
  imports: [
    IonicPageModule.forChild(TiendaOncePage),
  ],
})
export class TiendaOncePageModule {}
