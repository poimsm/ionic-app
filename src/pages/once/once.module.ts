import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OncePage } from './once';

@NgModule({
  declarations: [
    OncePage,
  ],
  imports: [
    IonicPageModule.forChild(OncePage),
  ],
})
export class OncePageModule {}
