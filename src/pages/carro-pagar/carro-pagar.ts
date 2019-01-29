import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Select } from 'ionic-angular';
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
  lo_antes_posible = true;
  definir_dia_hora = false;
  isDefinido = false;
  dia: string;
  hora: string;

  semana = ['Lunes 8', 'Martes 9', 'Miercoles 10', 'Jueves 13', 'Viernes 14'];
  horas = [
    'Entre 8:00 y 8:30',
    'Entre 8:30 y 9:00',
    'Entre 9:00 y 9:30',
    'Entre 9:30 y 10:00',
    'Entre 10:00 y 10:30',
    'Entre 10:30 y 11:00',
    'Entre 11:00 y 11:30',
    'Entre 11:30 y 12:00',
    'Entre 12:00 y 12:30',
    'Entre 12:30 y 13:00',
    'Entre 13:00 y 13:30',
    'Entre 13:30 y 14:00',
    'Entre 14:00 y 14:30',
    'Entre 14:30 y 15:00',
    'Entre 15:00 y 15:30',
    'Entre 15:30 y 16:00',
    'Entre 16:00 y 16:30',
    'Entre 16:30 y 17:00',
    'Entre 17:00 y 17:30',
    'Entre 17:30 y 18:00',
    'Entre 18:00 y 18:30',
    'Entre 18:30 y 19:00',
    'Entre 19:00 y 19:30',
    'Entre 19:30 y 20:00'
  ];

  @ViewChild('diaRef') diaRef: Select;
  @ViewChild('horaRef') horaRef: Select;

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

  openDiaHora(event: any) {
    if (event.value) {
      this.isDefinido = false;
      this.diaRef.open();
    } else {
      this.hora = '';
      this.dia = '';
    }
  }

  onSelectChange(selectedValue: any) {
    if (this.horas.indexOf(selectedValue) > -1 && !this.isDefinido) {
      this.isDefinido = false;
      this.diaRef.open();
    } else if (!this.isDefinido) {
      setTimeout(() => {
        this.isDefinido = true;
        this.horaRef.open();
      }, 500);
    }
  }

  onCancel() {
    this.hora = '';
    this.dia = '';
    this.definir_dia_hora = false;
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
    // Si todo el flujo de compra fue exitoso entonces
    // debes llamar al metodo this._carro.crearCompra(this.token, compra)
    // para guardar la compra en DB.. 
    const compra = {
      carro: this.carro,
      cliente: {
        uid: this.user._id,
        nombre: this.user.name
      }
    };
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


}
