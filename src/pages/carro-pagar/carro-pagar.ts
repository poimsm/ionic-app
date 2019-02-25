import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, Select } from 'ionic-angular';
import { CarroCompraExitosaPage } from '../carro-compra-exitosa/carro-compra-exitosa';
import { DatosPersonalesPage } from '../datos-personales/datos-personales';
import { CarroProvider } from '../../providers/carro/carro';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LocalizacionProvider } from '../../providers/localizacion/localizacion';

@IonicPage()
@Component({
  selector: 'page-carro-pagar',
  templateUrl: 'carro-pagar.html',
})
export class CarroPagarPage {
  efectivo = false;
  flow = true;

  total: number;
  direccion = 'Ej. Simon bolivar 802';
  telefono = 'Ej. 98372928';
  carro = [];
  token: string;
  user: any;
  isTelefono = false;
  isDireccion = false;
  isDiaHora = false;
  isDefinido = false;
  dia: string;
  hora: string;
  isBrowser = false;
  transactionID: string;
  ciudad: string;

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
    private _carro: CarroProvider,
    private iab: InAppBrowser,
    private alertCtrl: AlertController,
    private _localizacion: LocalizacionProvider
  ) {
    this.total = this.navParams.get('total');
    this.carro = this.navParams.get('carro');
    this.token = this.navParams.get('token');
    this.user = this.navParams.get('user');
    this.ciudad = this._localizacion.ciudad;
    if (this.user.phone) {
      this.telefono = this.user.phone;
      this.isTelefono = true;
    }
    if (this.user.address) {
      this.direccion = this.user.address;
      this.isDireccion = true;
    }
    console.log(this.user);

  }

  openSelect(tipo) {
    if (tipo == 'dia') {
      this.diaRef.open();
    }
    if (tipo == 'hora') {
      this.horaRef.open();
    }
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
      this.pagarConFlow();
    }
  }

  pagarConFlow() {

    this.isBrowser = true;

    const transaccion: any = {
      ok: false,
      cliente: {
        uid: this.user._id,
        nombre: this.user.name,
        email: this.user.local.email,
        direccion: this.direccion,
        telefono: this.telefono
      },
      monto: this.total
    }

    this._carro.createTransaction(transaccion)
      .then((res: any) => {

        this.transactionID = res._id;

        this._carro.iniciarCompra(this.token, res).then((data) => {
          let respuesta = JSON.parse(JSON.stringify(data));

          if (respuesta.code != undefined && respuesta.code == 108) {

            let alerta = this.alertCtrl.create({
              title: 'Error',
              subTitle: 'Imposible conectar con el sistema de pagos.'

            });
            alerta.present();
          } else {


            let token = respuesta.token;
            let url = respuesta.url;

            const browser = this.iab.create(url + '?token=' + token, '_blank', 'location=yes');


            browser.on('exit').subscribe(event => {
              this.isBrowser = false;
              this._carro.getTransaction(this.transactionID)
                .then((result: any) => {
                  if (result.ok) {
                    console.log('Move next page');
                    // this.pagoOnline();
                    this.navCtrl.push(CarroCompraExitosaPage);
                  }
                });
            });

            browser.show();
          }

        });
      });
  }


  pagoOnline() {

    this._carro.ordenarCarro();

    const promesas = [];

    this._carro.carros.forEach(carro => {

      const compra: any = {
        productos: carro.productos,
        tienda: carro.tienda,
        total: carro.total,
        cliente: {
          uid: this.user._id,
          nombre: this.user.name,
          email: this.user.local.email,
          direccion: this.direccion,
          telefono: this.telefono
        },
        metodo: 'Pago online'
      };

      if (this.isDiaHora) {
        compra.diaHoraDeEntrega = {
          isActive: true,
          dia: this.dia,
          hora: this.hora
        }
      }

      promesas.push(this._carro.crearCompra(this.token, compra));
    });

    Promise.all(promesas).then(() => {
      this.navCtrl.push(CarroCompraExitosaPage);
    });
  }


  pagarConEfectivo() {

    this._carro.ordenarCarro();

    const promesas = [];

    this._carro.carros.forEach(carro => {

      const compra: any = {
        productos: carro.productos,
        tienda: carro.tienda,
        total: carro.total,
        cliente: {
          uid: this.user._id,
          nombre: this.user.name,
          email: this.user.local.email,
          ciudad: this.ciudad,
          direccion: this.direccion,
          telefono: this.telefono
        },
        metodo: 'Efectivo en la entrega'
      };

      if (this.isDiaHora) {
        compra.diaHoraDeEntrega = {
          isActive: true,
          dia: this.dia,
          hora: this.hora
        }
      }

      promesas.push(this._carro.crearCompra(this.token, compra));
    });

    Promise.all(promesas).then(() => {
      this.navCtrl.push(CarroCompraExitosaPage);
    });
  }


  cambiarMetodoPago(event, tipo: number) {
    if (tipo == 1) {
      this.flow = (event == true) ? false : true;
    } else {
      this.efectivo = (event == true) ? false : true;
    }
  }

}
