import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MisPedidosPage } from '../mis-pedidos/mis-pedidos';

@IonicPage()
@Component({
  selector: 'page-carro-compra-exitosa',
  templateUrl: 'carro-compra-exitosa.html',
})
export class CarroCompraExitosaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarroCompraExitosaPage');
  }

  openPedidos() {
    this.navCtrl.setRoot(MisPedidosPage)
    // this.navCtrl.popToRoot();
    // this.navCtrl.push(CarroCompraExitosaPage);
    // this.navCtrl.push(HomePage);
    // this.navCtrl.push(MisPedidosPage)
  }

}
