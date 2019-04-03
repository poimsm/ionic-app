import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormularioStartPage } from './formulario-start';

@NgModule({
  declarations: [
    FormularioStartPage,
  ],
  imports: [
    IonicPageModule.forChild(FormularioStartPage),
  ],
})
export class FormularioStartPageModule {}
