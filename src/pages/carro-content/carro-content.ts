import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-carro-content',
  templateUrl: 'carro-content.html',
})
export class CarroContentPage {

  data: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.data = this.navParams.get('compra');
  }

}
