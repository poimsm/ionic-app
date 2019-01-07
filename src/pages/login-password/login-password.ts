import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginNamePage } from '../login-name/login-name';

@IonicPage()
@Component({
  selector: 'page-login-password',
  templateUrl: 'login-password.html',
})
export class LoginPasswordPage {
  key: string;
  email: string;
  password = '';
  passwordType: string = 'password';
  showPass = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.key = this.navParams.get('key');
    this.email = this.navParams.get('email');

  }

  showHide() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.showPass = !this.showPass;
  }


  next() {
    this.navCtrl.push(LoginNamePage, { email: this.email, password: this.password });
  }

}
