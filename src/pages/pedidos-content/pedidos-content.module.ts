import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidosContentPage } from './pedidos-content';

@NgModule({
  declarations: [
    PedidosContentPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidosContentPage),
  ],
})
export class PedidosContentPageModule {}
