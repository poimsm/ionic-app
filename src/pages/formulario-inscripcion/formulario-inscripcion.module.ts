import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormularioInscripcionPage } from './formulario-inscripcion';

@NgModule({
  declarations: [
    FormularioInscripcionPage,
  ],
  imports: [
    IonicPageModule.forChild(FormularioInscripcionPage),
  ],
})
export class FormularioInscripcionPageModule {}
