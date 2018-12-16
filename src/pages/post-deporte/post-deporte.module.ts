import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostDeportePage } from './post-deporte';

@NgModule({
  declarations: [
    PostDeportePage,
  ],
  imports: [
    IonicPageModule.forChild(PostDeportePage),
  ],
})
export class PostDeportePageModule {}
