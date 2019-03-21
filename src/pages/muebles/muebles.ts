import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MueblesContentPage } from '../muebles-content/muebles-content';


@IonicPage()
@Component({
  selector: 'page-muebles',
  templateUrl: 'muebles.html',
})
export class MueblesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openContent() {
    this.navCtrl.push(MueblesContentPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MueblesPage');
  }

}
