import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OfertaPage } from '../oferta/oferta';
import { PaquetePage } from '../paquete/paquete';

@IonicPage()
@Component({
  selector: 'page-mascotas-content',
  templateUrl: 'mascotas-content.html',
})
export class MascotasContentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openPromo(tipo) {
    if (tipo == 'oferta') {
      this.navCtrl.push(OfertaPage);
    } else {
      this.navCtrl.push(PaquetePage);
    }
  }

}
