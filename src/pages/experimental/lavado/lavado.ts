import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LavadoContentPage } from '../lavado-content/lavado-content';

@IonicPage()
@Component({
  selector: 'page-lavado',
  templateUrl: 'lavado.html',
})
export class LavadoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openContent() {
    this.navCtrl.push(LavadoContentPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LavadoPage');
  }

}
