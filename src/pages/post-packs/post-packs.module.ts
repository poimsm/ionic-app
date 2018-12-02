import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostPacksPage } from './post-packs';

@NgModule({
  declarations: [
    PostPacksPage,
  ],
  imports: [
    IonicPageModule.forChild(PostPacksPage),
  ],
})
export class PostPacksPageModule {}
