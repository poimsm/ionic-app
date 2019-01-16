import { Component } from "@angular/core";
import { IonicPage, App, NavController, ViewController, NavParams, AlertController } from "ionic-angular";
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
  showPass = false;
  loginFirst = true;
  loginSecond = false;
  loginThird = false;
  obteniendoRespuesta = false;

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private _auth: AuthProvider,
    public appCtrl: App,
    private alertCtrl: AlertController
  ) { }

  registrar() {
    this.loginFirst = false;
    this.loginSecond = true;
  }

  sesion() {
    this.loginFirst = false;
    this.loginThird = true;
  }

  signUp() {
    this.obteniendoRespuesta = true;
    if (this.name.length > 0 && this.email.length > 0 && this.password.length > 0) {
      this._auth.loginUp(this.name, this.email, this.password)
        .then(res => {
          if (res) {
            this.obteniendoRespuesta = false;
            this.viewCtrl.dismiss({ ok: true });
          } else {
            this.obteniendoRespuesta = false;
            this.signUpAlert();
          }
        });
    } else {
      this.close();
    }
  }

  signIn() {
    this.obteniendoRespuesta = true;
    if (this.email.length > 0 && this.password.length > 0) {
      this._auth.loginIn(this.email, this.password)
        .then(res => {
          if (res) {
            this.obteniendoRespuesta = false;
            this.viewCtrl.dismiss({ ok: true });
          } else {
            this.obteniendoRespuesta = false;
            this.signInAlert();
          }
        });
    } else {
      this.close();
    }
  }

  signUpAlert() {
    let alert = this.alertCtrl.create({
      title: 'El email ya está en uso',
      buttons: ['Aceptar']
    });
    alert.present();
  }

  signInAlert() {
    let alert = this.alertCtrl.create({
      title: 'Contraseña o email incorrecto',
      buttons: ['Aceptar']
    });
    alert.present();
  }

  showHide() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.showPass = !this.showPass;
  }

  close() {
    this.viewCtrl.dismiss({ ok: false });
  }
}
