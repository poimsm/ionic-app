import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FrutasContentPage } from './frutas-content';

@NgModule({
  declarations: [
    FrutasContentPage,
  ],
  imports: [
    IonicPageModule.forChild(FrutasContentPage),
  ],
})
export class FrutasContentPageModule {}
