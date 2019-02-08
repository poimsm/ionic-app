import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Select } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-tienda-envios',
  templateUrl: 'tienda-envios.html',
})
export class TiendaEnviosPage {

  @ViewChild('precioFijoRef') precioFijoRef: Select;
  @ViewChild('precioTopeRef') precioTopeRef: Select;

  A1 = false;
  B1 = false;
  isPropio = false;
  isPlataforma = false;
  tiendaID: string;
  localizacion: string;
  precioFijo: number;
  precioGratisSobre: number;
  fijoArray = [
    {
      tag: 'Reparto gratis',
      precio: 'Gratis',
      valor: 0
    },
    {
      tag: 'Se cobrará $600 por reparto',
      precio: '$600',
      valor: 600
    },
    {
      tag: 'Se cobrará $800 por reparto',
      precio: '$800',
      valor: 600
    },
    {
      tag: 'Se cobrará $1000 por reparto',
      precio: '$1000',
      valor: 1000
    },
    {
      tag: 'Se cobrará $1200 por reparto',
      precio: '$1200',
      valor: 1200
    },
    {
      tag: 'Se cobrará $1500 por reparto',
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _data: DataProvider
  ) {
    this.tiendaID = this.navParams.get('id');
    this.localizacion = this.navParams.get('localizacion');
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
      delivery: {
        isActive: true
      }
    }

    if (this.isPropio) {
      if (this.A1) {
        body.delivery.tipo = 'GRATIS SOBRE';
        body.delivery.gratisSobre = this.precioGratisSobre;
      }
      if (this.B1) {
        body.delivery.tipo = 'FIJO';
        body.delivery.precioFijo = this.precioFijo;
      }
      this._data.updateTienda(this.tiendaID, body)
        .then(() => console.log('listoo'));
    }

    if (this.isPlataforma && this.localizacion == "VALDIVIA") {
      body.delivery.tipo = 'JOOPITER EXPRESS';
      body.delivery.precioFijo = 1000;
      this._data.updateTienda(this.tiendaID, body)
        .then(() => console.log('listoo'));
    }

  }
}
