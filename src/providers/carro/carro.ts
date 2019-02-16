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
  subTotal = 0;
  totalEnvio = 0;
  tiendas = [];
  carros = [];

  constructor(
    public http: HttpClient,
    public toastCtrl: ToastController,
    private platform: Platform
  ) {
    this.setAPI();
  }

  setAPI() {
    if (this.platform.is('cordova')) {
      // this.apiURL = 'https://poimsm-server.herokuapp.com';
      this.apiURL = 'http://joopiterweb.com:3000';
    } else {
      this.apiURL = 'http://localhost:3000';
    }
  }

  addToCart(compra) {
    this.carro.push(compra);
    this.presentToast();
    this.calcularEnvio('add', compra.tienda);
    this.calcularSubTotal();
  }

  clearCart() {
    this.total = 0;
    this.carro = [];
  }

  addMore(type, index) {
    if (type == '-' && this.carro[index].cantidad != 0) {
      this.carro[index].cantidad -= 1;
      this.carro[index].total = this.carro[index].precio * this.carro[index].cantidad;
      this.calcularSubTotal();
    }

    if (type == '-' && this.carro[index].cantidad == 0) {
      setTimeout(() => {
        this.calcularEnvio('remove', this.carro[index].tienda);

        this.carro.splice(index, 1);
      }, 500);
    }

    if (type == '+' && this.carro[index].cantidad != 5) {
      this.carro[index].cantidad += 1;
      this.carro[index].total = this.carro[index].precio * this.carro[index].cantidad;
      this.calcularSubTotal();
    }
  }

  calcularSubTotal() {
    let subTotal = 0;
    this.carro.forEach(item => {
      subTotal += item.total;
    });
    this.subTotal = subTotal;
  }

  calcularEnvio(key, tiendita) {

    if (key == 'add') {
      let flag = true;

      this.tiendas.forEach(tienda => {
        if (tienda._id == tiendita._id) {
          flag = false;
        }
      });

      if (flag) {
        this.tiendas.push(tiendita);

        let totalEnvio = 0;
        this.tiendas.forEach(tienda => {

          if (tienda.envios.tipo == 'FIJO') {
            totalEnvio += Number(tienda.envios.precioFijo);
          }
          if (tienda.envios.tipo == 'PLATAFORMA') {
            totalEnvio += 1000;
          }

        });
        this.totalEnvio = totalEnvio;
      }

    }

    if (key == 'remove') {
      let counter = 0;

      this.carro.forEach(producto => {
        if (producto.tienda._id == tiendita._id) {
          counter += 1;
        }
      });
      console.log(counter);

      if (counter == 1) {
        let index = 0;
        this.tiendas.forEach((tienda, i) => {
          if (tienda._id == tiendita._id) {
            index = i;
          }
        });

        this.tiendas.splice(index, 1);

        let totalEnvio = 0;
        this.tiendas.forEach(tienda => {

          if (tienda.envios.tipo == 'FIJO') {
            totalEnvio += Number(tienda.envios.precioFijo);
          }
          if (tienda.envios.tipo == 'PLATAFORMA') {
            totalEnvio += 1000;
          }

        });
        this.totalEnvio = totalEnvio;
      }
    }
  }

  ordenarCarro() {

    this.tiendas.forEach(tienda => {

      let productos = [];
      let total = 0;

      this.carro.forEach(producto => {

        if (producto.tienda._id == tienda._id) {
          productos.push(producto);
          total += producto.total;
        }

      });

      const carro = { tienda, total, productos };
      this.carros.push(carro);
    });


  }

  crearCompra(token, body) {
    const url = `${this.apiURL}/compras/crear-compra`;
    const headers = new HttpHeaders({
      Authorization: `JWT ${token}`
    });
    this.tiendas.forEach(tienda => {
      this.notificarCompra(tienda._id);
    });
    return this.http.post(url, body, { headers }).toPromise();
  }

  createTransaction(body) {
    const url = `${this.apiURL}/transacciones/crear-transaccion`;
    return this.http.post(url, body).toPromise();
  }

  getTransaction(id) {
    const url = `${this.apiURL}/transacciones/one/${id}`;
    return this.http.get(url).toPromise();
  }

  iniciarCompra(token, body) {
    const url = `${this.apiURL}/compras/pago-iniciar`;
    const headers = new HttpHeaders({
      Authorization: `JWT ${token}`
    });
    return this.http.post(url, body, { headers }).toPromise();
  }

  notificarCompra(id) {
    console.log('tienda', id);
    if (!this.platform.is('cordova')) {
      return
    }
    const firebaseURL = `https://us-central1-joopiter-3af7f.cloudfunctions.net/pushNotification?id=${id}&tipo=tienda`;
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
