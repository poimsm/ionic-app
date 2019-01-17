import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MisPedidosPage } from '../mis-pedidos/mis-pedidos';

@IonicPage()
@Component({
  selector: 'page-carro-compra-exitosa',
  templateUrl: 'carro-compra-exitosa.html',
})
export class CarroCompraExitosaPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) { }

  openPedidos() {
    this.navCtrl.setRoot(MisPedidosPage);
  }

}
