import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MascotaContentExpPage } from '../mascota-content-exp/mascota-content-exp';

@IonicPage()
@Component({
  selector: 'page-mascotas-exp',
  templateUrl: 'mascotas-exp.html',
})
export class MascotasExpPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openContent() {
    this.navCtrl.push(MascotaContentExpPage);
  }

}
