import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostEstudiantePage } from './post-estudiante';

@NgModule({
  declarations: [
    PostEstudiantePage,
  ],
  imports: [
    IonicPageModule.forChild(PostEstudiantePage),
  ],
})
export class PostEstudiantePageModule {}
