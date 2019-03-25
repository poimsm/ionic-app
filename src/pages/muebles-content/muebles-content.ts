import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OfertaPage } from '../oferta/oferta';
import { PaquetePage } from '../paquete/paquete';
import { MueblesCustomPage } from '../muebles-custom/muebles-custom';


@IonicPage()
@Component({
  selector: 'page-muebles-content',
  templateUrl: 'muebles-content.html',
})
export class MueblesContentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openPromo(tipo) {
    if (tipo == 'oferta') {
      this.navCtrl.push(OfertaPage, { tipo: 'muebles' });
    } else {
      this.navCtrl.push(PaquetePage, { tipo: 'muebles' });
    }
  }

  openCustom() {
    this.navCtrl.push(MueblesCustomPage);
  }

}
