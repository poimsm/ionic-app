import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MascotasContentPage } from './mascotas-content';

@NgModule({
  declarations: [
    MascotasContentPage,
  ],
  imports: [
    IonicPageModule.forChild(MascotasContentPage),
  ],
})
export class MascotasContentPageModule {}
