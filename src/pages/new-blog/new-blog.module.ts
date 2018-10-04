import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewBlogPage } from './new-blog';

@NgModule({
  declarations: [
    NewBlogPage,
  ],
  imports: [
    IonicPageModule.forChild(NewBlogPage),
  ],
})
export class NewBlogPageModule {}
