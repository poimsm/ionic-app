import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CarroContentPage } from '../carro-content/carro-content';
import { CarroPagarPage } from '../carro-pagar/carro-pagar';
import { CarroProvider } from '../../providers/carro/carro';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-carro',
  templateUrl: 'carro.html',
})
export class CarroPage {

  token: string;
  user: any;
  isAuth = false;

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private _carro: CarroProvider,
    private _auth: AuthProvider
  ) { }

  ionViewDidLoad() {
    this.loadUser();
  }

  loadUser() {
    this._auth.authState.subscribe((data: any) => {
      if (data.isAuth) {
        this.isAuth = true;
        this.user = data.authData.user;
        this.token = data.authData.token;
      }
    });
  }


  openLogin() {
    const modal = this.modalCtrl.create(LoginPage);
    modal.onDidDismiss(data => {
      if (data.ok) {
        const datos = {
          total: this._carro.total,
          carro: this._carro.carro,
          token: this.token,
          user: this.user
        }
        this.navCtrl.push(CarroPagarPage, datos);
      }
    });
    modal.present();
  }

  openContent(compra) {
    this.navCtrl.push(CarroContentPage, { compra });
  }

  openPagar() {

    if (this.isAuth) {
      const datos = {
        total: this._carro.subTotal + this._carro.totalEnvio,
        carro: this._carro.carro,
        token: this.token,
        user: this.user
      }

      this.navCtrl.push(CarroPagarPage, datos);
    } else {
      this.openLogin();
    }
  }

}
