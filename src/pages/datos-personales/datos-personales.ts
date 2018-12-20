import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-datos-personales',
  templateUrl: 'datos-personales.html',
})
export class DatosPersonalesPage {

  telefono: number;
  direccion = '';
  isenabled = false;

  constructor( public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
  }

  close(key) {

    const datos = {
      ok: true,
      telefono: this.telefono,
      direccion: this.direccion
    }

    if (key == "x") {
      datos.ok = false
    }

    this.viewCtrl.dismiss(datos);
  }
  

}
