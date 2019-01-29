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
  total = 0;
  totalDulce = 0;
  totalNocturno = 0;
  token: string;
  user: any;
  isAuth = false;
  carroDulce = [];
  productos = [];
  tienda: any;

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private _carro: CarroProvider,
    private _auth: AuthProvider
  ) {
    if (this._carro.listadoCompras.length != 0) {
      this.loadCarroDulce();
    }

    if (this._carro.carro) {
      this.productos = this._carro.carro.productos;
      this.tienda = this._carro.carro.tienda;
      this.totalNocturno = this._carro.carro.total + 1000;
    }
  }

  limpiarCarro() {
    this.productos = [];
    this.tienda = {};
    this.totalNocturno = 0;
    this._carro.vaciaCarro();
  }

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

  loadCarroDulce() {
    const data = this._carro.listadoCompras;
    data.forEach(compra => {
      const once = {
        compra: compra,
        cantidad: 1,
        precio: compra.total,
        tipo: compra.tipo
      }
      this.carroDulce.push(once);
    });
    this.updateTotalDulce();
    this.comprasOnce = data;
  }

  addMore(type, index) {
    if (type == '-' && this.carroDulce[index].cantidad != 0) {
      this.carroDulce[index].cantidad -= 1;
      this.carroDulce[index].precio = this.carroDulce[index].compra.total * this.carroDulce[index].cantidad;
      this.updateTotalDulce();
    }

    if (type == '-' && this.carroDulce[index].cantidad == 0) {
      setTimeout(() => {
        this.carroDulce.splice(index, 1);
        this._carro.quitarItemDelCarro(index);
        this.updateTotalDulce();
      }, 500);
    }

    if (type == '+' && this.carroDulce[index].cantidad != 5) {
      this.carroDulce[index].cantidad += 1;
      this.carroDulce[index].precio = this.carroDulce[index].compra.total * this.carroDulce[index].cantidad;
      this.updateTotalDulce();
    }
  }

  updateTotalDulce() {
    let total = 0;
    this.carroDulce.forEach(item => {
      total += item.precio;
    });
    this.totalDulce = total + 1000 * this.carroDulce.length;;
  }

  openLogin() {
    const modal = this.modalCtrl.create(LoginPage);
    modal.onDidDismiss(data => {
      if (data.ok) {
        const datos = {
          total: this.total,
          carro: this.carroDulce,
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
        total: this.totalDulce + this.totalNocturno,
        carro: this.carroDulce,
        token: this.token,
        user: this.user
      }
      this.navCtrl.push(CarroPagarPage, datos);
    } else {
      this.openLogin();
    }
  }

}
