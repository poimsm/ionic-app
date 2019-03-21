import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IntroduccionPage } from '../introduccion/introduccion';


@IonicPage()
@Component({
  selector: 'page-paquete',
  templateUrl: 'paquete.html',
})
export class PaquetePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openIntro() {
    this.navCtrl.push(IntroduccionPage);
  }
  
}
