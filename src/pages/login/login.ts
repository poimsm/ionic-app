import { Component } from "@angular/core";
import { IonicPage, App, NavController, NavParams } from "ionic-angular";
import { HomePage } from "../../pages/home/home";
import { AuthProvider } from "../../providers/auth/auth";
import { LoginEmailPage } from '../login-email/login-email';

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  password: string = '';
  email: string = '';
  name: string = '';
  passwordType: string = 'password';
  identificar = false;
  alertSignIn = false;
  alertSignUp = false;
  showPass = false;

  LoginEmailPage;

  togglear = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _auth: AuthProvider,
    public appCtrl: App
  ) { }

  toggle() {
    if (this.togglear) {
      this.togglear = false
    } else {
      this.togglear = true
    }
    this.password = '';
    this.email = '';
    this.name = '';
  }

  registrar() {
    this.navCtrl.push(LoginEmailPage, { key: 'Registrar' })
  }

  sesion() {
    this.navCtrl.push(LoginEmailPage, { key: 'Iniciar sesión' })
  }

  signUp() {
    this._auth.loginUp(this.name, this.email, this.password)
      .then(res => {
        if (res) {
          this.navCtrl.setRoot(HomePage)
        } else {
          this.alertSignUp = true;
        }
      });
  }

  signIn() {
    this._auth.loginIn(this.email, this.password)
      .then(res => {
        if (res) {
          this.navCtrl.setRoot(HomePage)
        } else {
          this.alertSignIn = true;
        }
      });
  }

  showHide() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.showPass = !this.showPass;
  }
}
