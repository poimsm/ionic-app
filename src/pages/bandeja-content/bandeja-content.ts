import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-bandeja-content',
  templateUrl: 'bandeja-content.html',
})
export class BandejaContentPage {
  data: any;
  imgs = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = this.navParams.get('compra');
  }

}
