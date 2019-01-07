import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginNamePage } from './login-name';

@NgModule({
  declarations: [
    LoginNamePage,
  ],
  imports: [
    IonicPageModule.forChild(LoginNamePage),
  ],
})
export class LoginNamePageModule {}
