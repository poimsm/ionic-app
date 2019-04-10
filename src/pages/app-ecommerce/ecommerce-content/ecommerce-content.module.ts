import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EcommerceContentPage } from './ecommerce-content';

@NgModule({
  declarations: [
    EcommerceContentPage,
  ],
  imports: [
    IonicPageModule.forChild(EcommerceContentPage),
  ],
})
export class EcommerceContentPageModule {}
