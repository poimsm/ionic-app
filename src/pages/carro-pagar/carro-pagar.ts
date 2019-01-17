import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CarroCompraExitosaPage } from '../carro-compra-exitosa/carro-compra-exitosa';
import { DatosPersonalesPage } from '../datos-personales/datos-personales';
import { CarroProvider } from '../../providers/carro/carro';

@IonicPage()
@Component({
  selector: 'page-carro-pagar',
  templateUrl: 'carro-pagar.html',
})
export class CarroPagarPage {
  efectivo = true;
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
    private _carro: CarroProvider
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
      this.pagarConFlow(this.email, this.total)
    }
  }

  pagarConFlow(email, monto) {

    console.log(email, monto);
  }

  pagarConEfectivo() {
    const data = {
      carro: this.carro,
      cliente: {
        uid: this.user._id,
        nombre: this.user.name
      }
    };
    this._carro.crearCompra(this.token, data)
      .then(() => this.navCtrl.push(CarroCompraExitosaPage));
  }


}
