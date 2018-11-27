import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdersContentPage } from './orders-content';

@NgModule({
  declarations: [
    OrdersContentPage,
  ],
  imports: [
    IonicPageModule.forChild(OrdersContentPage),
  ],
})
export class OrdersContentPageModule {}
