import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MisProductosPage } from './mis-productos';

@NgModule({
  declarations: [
    MisProductosPage,
  ],
  imports: [
    IonicPageModule.forChild(MisProductosPage),
  ],
})
export class MisProductosPageModule {}
