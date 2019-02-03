import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocalizacionPage } from './localizacion';

@NgModule({
  declarations: [
    LocalizacionPage,
  ],
  imports: [
    IonicPageModule.forChild(LocalizacionPage),
  ],
})
export class LocalizacionPageModule {}
