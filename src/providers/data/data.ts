import { Injectable } from "@angular/core";
import { ToastController, Platform } from 'ionic-angular';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class DataProvider {
  apiURL: string;

  constructor(
    public toastCtrl: ToastController,
    public http: HttpClient,
    private platform: Platform
  ) {
    this.setAPI();
  }

  setAPI() {
    if (this.platform.is('cordova')) {
      this.apiURL = 'https://poimsm-server.herokuapp.com';
    } else {
      this.apiURL = 'https://poimsm-server.herokuapp.com';
      // apiURL = 'http://localhost:3000';
    }
  }

  comprarOnce(token, body) {
    const url = `${this.apiURL}/compras/nueva-compra-once`;
    const headers = new HttpHeaders({
      Authorization: `JWT ${token}`
    });

    this.presentToast();
    return this.http.post(url, body, { headers }).toPromise();
  }

  comprarEcommerce(token, body) {
    const url = `${this.apiURL}/compras/nueva-compra-ecommerce`;
    const headers = new HttpHeaders({
      Authorization: `JWT ${token}`
    });

    this.presentToast();
    return this.http.post(url, body, { headers }).toPromise();
  }

  notificarCompra(token) {
    const firebaseURL = 'https://us-central1-joopiter-3af7f.cloudfunctions.net/pushNotification';
    return this.http.get(firebaseURL).toPromise();
  }

  misComprasEcommerce(token, id) {
    const url = `${this.apiURL}/compras/compras-por-usuario-ecommerce/${id}`;
    const headers = new HttpHeaders({
      Authorization: `JWT ${token}`
    });

    return this.http.get(url, { headers }).toPromise();
  }

  misComprasOnce(token, id) {
    const url = `${this.apiURL}/compras/compras-por-usuario-once/${id}`;
    const headers = new HttpHeaders({
      Authorization: `JWT ${token}`
    });

    return this.http.get(url, { headers }).toPromise();
  }

  deliveryOnce() {
    const url = `${this.apiURL}/compras/delivery-once`;
    return this.http.get(url).toPromise();
  }

  deliveryEcommerce() {
    const url = `${this.apiURL}/compras/delivery-ecommerce`;
    return this.http.get(url).toPromise();
  }

  getAll(skip, limit, category, route) {

    let url = `${this.apiURL}/${route}`;
    url = url + `?limit=${limit}&skip=${skip}`;

    if (category) {
      url = url + `&category=${category}`;
    }
    return this.http.get(url).toPromise();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Pedido creado con exito',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}
