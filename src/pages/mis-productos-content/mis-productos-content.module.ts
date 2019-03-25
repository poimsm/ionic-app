import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MisProductosContentPage } from './mis-productos-content';

@NgModule({
  declarations: [
    MisProductosContentPage,
  ],
  imports: [
    IonicPageModule.forChild(MisProductosContentPage),
  ],
})
export class MisProductosContentPageModule {}
