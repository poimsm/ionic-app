import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostExplorarPage } from './post-explorar';

@NgModule({
  declarations: [
    PostExplorarPage,
  ],
  imports: [
    IonicPageModule.forChild(PostExplorarPage),
  ],
})
export class PostExplorarPageModule {}
