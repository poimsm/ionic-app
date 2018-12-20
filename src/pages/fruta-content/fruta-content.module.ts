import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FrutaContentPage } from './fruta-content';

@NgModule({
  declarations: [
    FrutaContentPage,
  ],
  imports: [
    IonicPageModule.forChild(FrutaContentPage),
  ],
})
export class FrutaContentPageModule {}
