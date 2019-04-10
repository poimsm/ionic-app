import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuperProductosPage } from './super-productos';

@NgModule({
  declarations: [
    SuperProductosPage,
  ],
  imports: [
    IonicPageModule.forChild(SuperProductosPage),
  ],
})
export class SuperProductosPageModule {}
