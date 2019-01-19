import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController, Platform } from 'ionic-angular';


@Injectable()
export class CarroProvider {

  listadoCompras = [];
  apiURL: string;
  carro: any;

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
      // this.apiURL = 'https://poimsm-server.herokuapp.com';
      this.apiURL = 'http://localhost:3000';
    }
  }

  agregarAlCarro(carro) {
    this.carro = carro;
    this.presentToast();
    console.log(this.carro);

  }

  vaciaCarro() {
    this.carro = {};
  }

  agregarItemAlCarro(compra) {
    this.listadoCompras.push(compra);
    this.presentToast();
  }

  quitarItemDelCarro(index) {
    this.listadoCompras.splice(index, 1);
  }

  crearCompra(token, body) {
    const url = `${this.apiURL}/compras/crear-compra`;
    const headers = new HttpHeaders({
      Authorization: `JWT ${token}`
    });
    this.notificarCompra();
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
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
