import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FrutaPage } from './fruta';

@NgModule({
  declarations: [
    FrutaPage,
  ],
  imports: [
    IonicPageModule.forChild(FrutaPage),
  ],
})
export class FrutaPageModule {}
