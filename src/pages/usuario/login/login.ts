import { Component } from "@angular/core";
import { IonicPage, App, NavController, ViewController, NavParams, AlertController } from "ionic-angular";
import { AuthProvider } from "../../../providers/auth/auth";

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
  isInicio = true;
  isRegistrar = false;
  isSesion = false;
  isNegocio = false;
  obteniendoRespuesta = false;
  nombre: string;
  apellido: string;

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private _auth: AuthProvider,
    public appCtrl: App,
    private alertCtrl: AlertController
  ) { }

  inicio() {
    this.isInicio = true;
    this.isRegistrar = false;
    this.isSesion = false;
    this.isNegocio = false;
  }

  registrar() {
    this.isInicio = false;
    this.isRegistrar = true;
    this.isSesion = false;
    this.isNegocio = false;
  }

  sesion() {
    this.isInicio = false;
    this.isRegistrar = false;
    this.isSesion = true;
    this.isNegocio = false;
  }

  negocio() {
    this.isInicio = false;
    this.isRegistrar = false;
    this.isSesion = false;
    this.isNegocio = true;
  }

  signUp() {
    this.obteniendoRespuesta = true;

    if (this.nombre && this.apellido && this.email && this.password) {
      const nombreCompleto = this.nombre + ' ' + this.apellido;

      this._auth.loginUp(nombreCompleto, this.email, this.password)
        .then(res => {
          console.log('pasoo?');
          
          if (res) {
            this.obteniendoRespuesta = false;
            this.viewCtrl.dismiss({ ok: true });
          } else {
            this.obteniendoRespuesta = false;
            this.signUpAlert();
          }
        });
    } else {
      console.log('Completar!');
      
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
