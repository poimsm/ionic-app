import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComidaContentPage } from './comida-content';

@NgModule({
  declarations: [
    ComidaContentPage,
  ],
  imports: [
    IonicPageModule.forChild(ComidaContentPage),
  ],
})
export class ComidaContentPageModule {}
