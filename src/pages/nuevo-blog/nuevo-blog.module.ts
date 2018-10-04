import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevoBlogPage } from './nuevo-blog';

@NgModule({
  declarations: [
    NuevoBlogPage,
  ],
  imports: [
    IonicPageModule.forChild(NuevoBlogPage),
  ],
})
export class NuevoBlogPageModule {}
