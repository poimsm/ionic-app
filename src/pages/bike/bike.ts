import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BikeMapaPage } from '../bike-mapa/bike-mapa';
import { BikeProgramarPage } from '../bike-programar/bike-programar';


@IonicPage()
@Component({
  selector: 'page-bike',
  templateUrl: 'bike.html',
})
export class BikePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openEnviaRecibe(tipo) {
    this.navCtrl.push(BikeMapaPage, { tipo });
  }

  openProgramar() {
    this.navCtrl.push(BikeProgramarPage);
  }

  onChange(event) {
    if (event.checked) {
      this.navCtrl.push(BikeProgramarPage);
    }
  }

}
