import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MisPedidosPage } from '../mis-pedidos/mis-pedidos';
import { HomePage } from '../home/home';
import { CarroProvider } from '../../providers/carro/carro';

@IonicPage()
@Component({
  selector: 'page-carro-compra-exitosa',
  templateUrl: 'carro-compra-exitosa.html',
})
export class CarroCompraExitosaPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _carro: CarroProvider
  ) { }

  openPedidos() {
    this.navCtrl.setRoot(MisPedidosPage);
  }
  openHome() {
    this._carro.clearCart();
    this.navCtrl.setRoot(HomePage);
  }

}
