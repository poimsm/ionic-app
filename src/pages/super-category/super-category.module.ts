import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuperCategoryPage } from './super-category';

@NgModule({
  declarations: [
    SuperCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(SuperCategoryPage),
  ],
})
export class SuperCategoryPageModule {}
