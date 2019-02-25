import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarroEcommercePage } from './carro-ecommerce';

@NgModule({
  declarations: [
    CarroEcommercePage,
  ],
  imports: [
    IonicPageModule.forChild(CarroEcommercePage),
  ],
})
export class CarroEcommercePageModule {}
