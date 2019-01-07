import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginPasswordPage } from '../login-password/login-password';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login-email',
  templateUrl: 'login-email.html',
})
export class LoginEmailPage {
  key: string;
  sesion = false;
  showPass = false;
  passwordType: string = 'password';
  email = '';
  password = '';

  nextReady = true;
  emailReady = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _auth: AuthProvider,
    private alertCtrl: AlertController
  ) {
    this.key = this.navParams.get('key');
    if (this.key == 'Iniciar sesión') {
      this.sesion = true;
    }
  }

  next() {
    if (this.key == 'Registrar') {
      this.checkEmail();
    } else {
      this.signIn();
    }
  }

  presentSignUpAlert() {
    let alert = this.alertCtrl.create({
      title: 'El email ya está en uso',
      buttons: ['Aceptar']
    });
    alert.present();
  }

  presentSignInAlert() {
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

  signIn() {
    this.nextReady = false;
    this._auth.loginIn(this.email, this.password)
      .then(res => {
        if (res) {
          this.navCtrl.setRoot(HomePage)
        } else {
          this.nextReady = true;
          this.presentSignInAlert();
        }
      });
  }

  checkEmail() {
    this.nextReady = false;
    this._auth.checkEmail(this.email)
      .then((data: any) => {
        if (!data.isTaken) {
          this.nextReady = true;
          const data = { email: this.email }
          this.navCtrl.push(LoginPasswordPage, data)
        } else {
          this.nextReady = true;
          this.presentSignUpAlert();
        }
      });
  }

}
