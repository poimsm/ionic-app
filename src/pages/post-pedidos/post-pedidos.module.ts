import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostPedidosPage } from './post-pedidos';

@NgModule({
  declarations: [
    PostPedidosPage,
  ],
  imports: [
    IonicPageModule.forChild(PostPedidosPage),
  ],
})
export class PostPedidosPageModule {}
