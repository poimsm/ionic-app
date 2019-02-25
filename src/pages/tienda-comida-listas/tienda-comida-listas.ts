import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tienda-comida-listas',
  templateUrl: 'tienda-comida-listas.html',
})
export class TiendaComidaListasPage {

  tipo: string;
  opciones = [];
  titulo: string;
  opcion: string;
  titulo_placeholder: string;
  opcion_placeholder: string;
  info: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.tipo = this.navParams.get('tipo');
    if (this.tipo == 'multiple') {
      this.titulo_placeholder = 'Ej. ¿Qué salsas desea agregar?';
      this.opcion_placeholder = 'Ej. Mayonesa';
      this.info = 'El cliente podrá seleccionar tantas opciones como desee';
    } else {
      this.titulo_placeholder = 'Ej. Seleccione una bebida';
      this.opcion_placeholder = 'Ej. Fanta';
      this.info = 'El cliente podrá seleccionar solo una opción';

    }
  }

  onlyClose() {
    this.viewCtrl.dismiss({ ok: false });
  }

  closeData() {
    this.viewCtrl.dismiss({
      ok: true,
      titulo: this.titulo,
      opciones: this.opciones,
      tipo: this.tipo
    });
  }

  addOpt(opcion) {
    this.opciones.push(opcion);
  }

}
