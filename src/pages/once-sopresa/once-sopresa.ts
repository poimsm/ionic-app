import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Select, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-once-sopresa',
  templateUrl: 'once-sopresa.html',
})
export class OnceSopresaPage {

  data: any;
  tematicas = [];
  tamanos = [];
  galeria = [];
  tematica: string;
  mensaje: string;
  tamano: string;

  @ViewChild('tematicaRef') tematicaRef: Select;
  @ViewChild('tamanoRef') tamanoRef: Select;

  constructor(private alertCtrl: AlertController,
    public navCtrl: NavController, public navParams: NavParams) {
    this.data = this.navParams.get('sorpresa');
    this.galeria = this.data.galeria;

    if (this.data.tamanos) {
      this.tamanos = this.data.tamanos;
      this.tamano = this.tamanos[0].tamano;
    }

    if (this.data.tematicas) {
      this.tematicas = this.data.tematicas;
      this.tematica = this.tematicas[0];
    }

  }

  openSelect(key) {
    if (key == 'tematica') {
      this.tematicaRef.open();
    } else {
      this.tamanoRef.open();
    }
  }

  save() {
    const compra: any = {
      tienda: this.data.tienda,
      img: this.galeria[0].url,
      tipo: 'sorpresa'
    }
    if (this.mensaje) {
      compra.mensaje = this.mensaje
    }
    if (this.tematica) {
      compra.tematica = this.tematica
    }
    if (this.tamano) {
      compra.tamano = this.tamano
    }
    console.log(compra);
  }

}
