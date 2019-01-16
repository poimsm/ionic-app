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

  comprasEcommerce: any = [];
  comprasOnce: any = [];
  total: number;
  token: string;
  user: any;
  isAuth = false;
  carro = [];

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private _carro: CarroProvider,
    private _auth: AuthProvider
  ) { }

  ionViewDidLoad() {
    this.loadUser();
    this.loadCarro();
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

  loadCarro() {
    const data = this._carro.listadoCompras;
    data.forEach(compra => {
      const once = {
        compra: compra,
        cantidad: 1,
        precio: compra.total,
        tipo: compra.tipo
      }
      this.carro.push(once);
    });
    this.updateTotal();
    this.comprasOnce = data;
    console.log(data);

  }

  addMore(type, index) {
    if (type == '-' && this.carro[index].cantidad != 0) {
      this.carro[index].cantidad -= 1;
      this.carro[index].precio = this.carro[index].compra.total * this.carro[index].cantidad;
      this.updateTotal();
    }

    if (type == '-' && this.carro[index].cantidad == 0) {
      setTimeout(() => {
        this.carro.splice(index, 1);
        this._carro.quitarItemDelCarro(index);
      }, 500);
    }

    if (type == '+' && this.carro[index].cantidad != 5) {
      this.carro[index].cantidad += 1;
      this.carro[index].precio = this.carro[index].compra.total * this.carro[index].cantidad;
      this.updateTotal();
    }
  }

  updateTotal() {
    let total = 0;
    this.carro.forEach(item => {
      total += item.precio;
    });
    this.total = total;
  }

  openLogin() {
    const modal = this.modalCtrl.create(LoginPage);
    modal.onDidDismiss(data => {
      if (data.ok) {
        const datos = {
          total: this.total,
          carro: this.carro,
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
        total: this.total,
        carro: this.carro,
        token: this.token,
        user: this.user
      }
      this.navCtrl.push(CarroPagarPage, datos);
    } else {
      this.openLogin();
    }
  }

}
