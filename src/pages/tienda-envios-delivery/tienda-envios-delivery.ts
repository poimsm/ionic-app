import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Select } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-tienda-envios-delivery',
  templateUrl: 'tienda-envios-delivery.html',
})
export class TiendaEnviosDeliveryPage {

  @ViewChild('precioFijoRef') precioFijoRef: Select;
  @ViewChild('precioTopeRef') precioTopeRef: Select;

  A1 = false;
  B1 = false;
  isPropio = false;
  isPlataforma = false;
  isDefined: boolean;
  tiendaID: string;
  ciudad: string;
  precioFijo: number;
  precioGratisSobre: number;
  fijoArray = [
    {
      tag: 'Los envíos serán gratis',
      precio: 'Gratis',
      valor: 0
    },
    {
      tag: 'Se cobrará $600 adicional por el envío',
      precio: '$600',
      valor: 600
    },
    {
      tag: 'Se cobrará $800 adicional por el envío',
      precio: '$800',
      valor: 800
    },
    {
      tag: 'Se cobrará $1000 adicional por el envío',
      precio: '$1000',
      valor: 1000
    },
    {
      tag: 'Se cobrará $1200 adicional por el envío',
      precio: '$1200',
      valor: 1200
    },
    {
      tag: 'Se cobrará $1500 adicional por el envío',
      precio: '$1500',
      valor: 1500
    }
  ];

  gratisSobreArray = [
    {
      tag: 'Gratis sobre $3000',
      precio: '$3000',
      valor: 3000
    },
    {
      tag: 'Gratis sobre $4000',
      precio: '$4000',
      valor: 4000
    },
    {
      tag: 'Gratis sobre $5000',
      precio: '$5000',
      valor: 5000
    },
    {
      tag: 'Gratis sobre $6000',
      precio: '$6000',
      valor: 6000
    },
    {
      tag: 'Gratis sobre $8000',
      precio: '$8000',
      valor: 8000
    },
    {
      tag: 'Gratis sobre $10.000',
      precio: '$10000',
      valor: 10000
    },
    {
      tag: 'Gratis sobre $12.000',
      precio: '$12000',
      valor: 12000
    },
  ];

  envios: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _data: DataProvider
  ) {
    this.tiendaID = this.navParams.get('id');
    this.ciudad = this.navParams.get('ciudad');
    this.envios = this.navParams.get('envios');
    this.isDefined = this.envios.isActive;
  }

  openSelect(tipo) {
    if (tipo == 'fijo' && this.B1) {
      this.precioFijoRef.open();
    }
    if (tipo == 'tope' && this.A1) {
      this.precioTopeRef.open();
    }
  }

  cambiarMetodoPago(event, tipo: number) {
    if (tipo == 2) {
      this.isPropio = (event == true) ? false : true;
    } else {
      this.isPlataforma = (event == true) ? false : true;
    }
  }

  onSelectChange(tag, tipo) {
    if (tipo == 'fijo') {
      this.fijoArray.forEach((item, i) => {
        if (item.tag == tag) {
          this.precioFijo = this.fijoArray[i].valor;
        }
      });
      console.log(this.precioFijo);

    }
    if (tipo == 'gratisSobre') {
      this.gratisSobreArray.forEach((item, i) => {
        if (item.tag == tag) {
          this.precioGratisSobre = this.gratisSobreArray[i].valor;
        }
      });
      console.log(this.precioGratisSobre);

    }
  }

  save() {

    const body: any = {
      envios: {
        isActive: true
      }
    }

    if (this.isPropio) {
      if (this.A1) {
        body.envios.tipo = 'GRATIS SOBRE';
        body.envios.gratisSobre = this.precioGratisSobre;
      }
      if (this.B1) {
        body.envios.tipo = 'FIJO';
        body.envios.precioFijo = this.precioFijo;
      }
      this._data.updateTienda(this.tiendaID, body)
        .then(() => this.navCtrl.pop());
    }

    if (this.isPlataforma && this.ciudad == "VALDIVIA") {
      body.envios.tipo = 'PLATAFORMA';
      body.envios.precioFijo = 1000;
      this._data.updateTienda(this.tiendaID, body)
        .then(() => this.navCtrl.pop());
    }

  }
}
