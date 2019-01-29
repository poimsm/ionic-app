import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GaleriaImagenPage } from './galeria-imagen';

@NgModule({
  declarations: [
    GaleriaImagenPage,
  ],
  imports: [
    IonicPageModule.forChild(GaleriaImagenPage),
  ],
})
export class GaleriaImagenPageModule {}
