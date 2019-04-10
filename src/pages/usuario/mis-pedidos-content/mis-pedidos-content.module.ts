import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MisPedidosContentPage } from './mis-pedidos-content';

@NgModule({
  declarations: [
    MisPedidosContentPage,
  ],
  imports: [
    IonicPageModule.forChild(MisPedidosContentPage),
  ],
})
export class MisPedidosContentPageModule {}
