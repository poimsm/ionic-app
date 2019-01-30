import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { CarroCompraExitosaPage } from '../carro-compra-exitosa/carro-compra-exitosa';
import { DatosPersonalesPage } from '../datos-personales/datos-personales';
import { CarroProvider } from '../../providers/carro/carro';

import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-carro-pagar',
  templateUrl: 'carro-pagar.html',
})
export class CarroPagarPage {
  efectivo = true;
  flow = false;

  total: number;
  direccion = 'Ej. Simon bolivar 802';
  telefono = 'Ej. 98372928';
  carro = [];
  token: string;
  user: any;
  isTelefono = false;
  isDireccion = false;
  email: string;
  monto: number;

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private _carro: CarroProvider,
    private iab: InAppBrowser,
    private alertCtrl: AlertController
  ) {
    this.total = this.navParams.get('total');
    this.carro = this.navParams.get('carro');
    this.token = this.navParams.get('token');
    this.user = this.navParams.get('user');
    this.email = this.user.local.email;
  }

  openModal(tipo) {
    const modal = this.modalCtrl.create(DatosPersonalesPage, { tipo });
    modal.onDidDismiss(data => {
      if (data.ok && data.tipo == 'direccion') {
        this.direccion = data.direccion;
        this.isDireccion = true;
      }
      if (data.ok && data.tipo == 'telefono') {
        this.telefono = data.telefono;
        this.isTelefono = true;
      }
    });
    modal.present();
  }

  pagar() {
    if (this.efectivo) {
      this.pagarConEfectivo();
    } else {

      let total = 0;
      
      this.carro.forEach(item => {
        total += item.precio * item.cantidad;
      });

      this.total = total;
      
      this.pagarConFlow(this.email, this.total);
    }
  }

  pagarConFlow(email, monto) {
    // Si todo el flujo de compra fue exitoso entonces
    // debes llamar al metodo this._carro.crearCompra(this.token, compra)
    // para guardar la compra en DB.. 
    const compra = {
      carro: this.carro,
      cliente: {
        uid: this.user._id,
        nombre: this.user.name,
        email: email,
        monto: 18000
      }
    };

    this._carro.iniciarCompra(this.token, compra).then((data) => { 
      let respuesta = JSON.parse(JSON.stringify(data));

      if(respuesta.code != undefined && respuesta.code == 108){

        let alerta = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Imposible conectar con el sistema de pagos.'

        });
        alerta.present();
      }else{
        

        let token = respuesta.token;
        let url = respuesta.url;

        const browser = this.iab.create(url + '?token=' + token, '_blank', 'location=yes');
        browser.show();
      }
      

    });
  }

  pagarConEfectivo() {
    const compra = {
      carro: this.carro,
      cliente: {
        uid: this.user._id,
        nombre: this.user.name
      }
    };
    this._carro.crearCompra(this.token, compra)
      .then(() => this.navCtrl.push(CarroCompraExitosaPage));
  }

  cambiarMetodoPago(event, tipo: number){
    if(tipo == 1){
      this.flow = (event == true) ? false : true;
    }else{
      this.efectivo = (event == true) ? false : true;
    }
  }

}
