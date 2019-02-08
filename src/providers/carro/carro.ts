import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController, Platform } from 'ionic-angular';


@Injectable()
export class CarroProvider {

  listadoCompras = [];
  apiURL: string;
  carro2: any;
  carro = [];
  total = 0;

  constructor(
    public http: HttpClient,
    public toastCtrl: ToastController,
    private platform: Platform
  ) {
    this.setAPI();
  }

  setAPI() {
    if (this.platform.is('cordova')) {
      this.apiURL = 'https://poimsm-server.herokuapp.com';
    } else {
      this.apiURL = 'http://localhost:3000';
    }
  }

  addToCart(compra) {
    this.carro.push(compra);
    this.presentToast();
    this.updateTotal();
  }

  clearCart() {
    this.carro = [];
  }

  addMore(type, index) {
    if (type == '-' && this.carro[index].cantidad != 0) {
      this.carro[index].cantidad -= 1;
      this.carro[index].total = this.carro[index].precio * this.carro[index].cantidad;
      this.updateTotal();
    }

    if (type == '-' && this.carro[index].cantidad == 0) {
      setTimeout(() => {
        this.carro.splice(index, 1);
        this.updateTotal();
      }, 500);
    }

    if (type == '+' && this.carro[index].cantidad != 5) {
      this.carro[index].cantidad += 1;
      this.carro[index].total = this.carro[index].precio * this.carro[index].cantidad;
      this.updateTotal();
    }
  }

  updateTotal() {
    let total = 0;
    this.carro.forEach(item => {
      total += item.total;
    });
    this.total = total + 1000 * this.carro.length;
  }


  crearCompra(token, body) {
    const url = `${this.apiURL}/compras/crear-compra`;
    const headers = new HttpHeaders({
      Authorization: `JWT ${token}`
    });
    this.notificarCompra();
    return this.http.post(url, body, { headers }).toPromise();
  }

  iniciarCompra(token, body) {
    const url = `${this.apiURL}/compras/pago-iniciar`;
    const headers = new HttpHeaders({
      Authorization: `JWT ${token}`
    });
    //this.notificarCompra();
    return this.http.post(url, body, { headers }).toPromise();
  }

  notificarCompra() {
    if (!this.platform.is('cordova')) {
      return
    }
    const firebaseURL = 'https://us-central1-joopiter-3af7f.cloudfunctions.net/pushNotification';
    return this.http.get(firebaseURL).toPromise();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Se agrego a tu carro de compras.',
      duration: 2500,
      position: 'bottom'
    });
    toast.present();
  }
}
