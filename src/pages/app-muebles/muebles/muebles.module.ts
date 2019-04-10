import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MueblesPage } from './muebles';

@NgModule({
  declarations: [
    MueblesPage,
  ],
  imports: [
    IonicPageModule.forChild(MueblesPage),
  ],
})
export class MueblesPageModule {}
