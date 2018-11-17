import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExplorarContentPage } from './explorar-content';

@NgModule({
  declarations: [
    ExplorarContentPage,
  ],
  imports: [
    IonicPageModule.forChild(ExplorarContentPage),
  ],
})
export class ExplorarContentPageModule {}
