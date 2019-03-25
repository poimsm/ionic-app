import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MascotasContentPage } from '../mascotas-content/mascotas-content';
import { SuperPage } from '../super/super';


@IonicPage()
@Component({
  selector: 'page-mascotas',
  templateUrl: 'mascotas.html',
})
export class MascotasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openContent() {
    this.navCtrl.push(MascotasContentPage);
  }

  openSuper() {
    this.navCtrl.push(SuperPage, { tipo: 'mascotas' });
  }

}
