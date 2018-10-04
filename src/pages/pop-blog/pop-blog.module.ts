import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopBlogPage } from './pop-blog';

@NgModule({
  declarations: [
    PopBlogPage,
  ],
  imports: [
    IonicPageModule.forChild(PopBlogPage),
  ],
})
export class PopBlogPageModule {}
