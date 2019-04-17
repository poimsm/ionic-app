import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsuarioHistorialPage } from './usuario-historial';

@NgModule({
  declarations: [
    UsuarioHistorialPage,
  ],
  imports: [
    IonicPageModule.forChild(UsuarioHistorialPage),
  ],
})
export class UsuarioHistorialPageModule {}
