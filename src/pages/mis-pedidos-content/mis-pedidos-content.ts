import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-mis-pedidos-content',
  templateUrl: 'mis-pedidos-content.html',
})
export class MisPedidosContentPage {

  data: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.data = this.navParams.get('compra');
  }

}
