import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MueblesOfertaPage } from '../muebles-oferta/muebles-oferta';
import { MueblesPaquetePage } from '../muebles-paquete/muebles-paquete';
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
      this.navCtrl.push(MueblesOfertaPage, { tipo: 'muebles' });
    } else {
      this.navCtrl.push(MueblesPaquetePage, { tipo: 'muebles' });
    }
  }

  openCustom() {
    this.navCtrl.push(MueblesCustomPage);
  }

}
