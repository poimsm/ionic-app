import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IntroduccionPage } from '../introduccion/introduccion';

@IonicPage()
@Component({
  selector: 'page-mascotas-paquete',
  templateUrl: 'mascotas-paquete.html',
})
export class MascotasPaquetePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openIntro() {
    this.navCtrl.push(IntroduccionPage);
  }
  
}

