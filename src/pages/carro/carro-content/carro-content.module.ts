import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarroContentPage } from './carro-content';

@NgModule({
  declarations: [
    CarroContentPage,
  ],
  imports: [
    IonicPageModule.forChild(CarroContentPage),
  ],
})
export class CarroContentPageModule {}
