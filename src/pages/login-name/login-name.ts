import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login-name',
  templateUrl: 'login-name.html',
})
export class LoginNamePage {

  name = '';
  email = '';
  password = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _auth: AuthProvider
  ) {
    this.email = this.navParams.get('email');
    this.password = this.navParams.get('password');
  }

  signUp() {
    console.log(this.name);
    console.log(this.email);
    console.log(this.password);


    this._auth.loginUp(this.name, this.email, this.password)
      .then(() => this.navCtrl.setRoot(HomePage));
  }

}
