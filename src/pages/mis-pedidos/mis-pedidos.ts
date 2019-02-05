import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { AuthProvider } from '../../providers/auth/auth';
import { MisPedidosContentPage } from '../mis-pedidos-content/mis-pedidos-content';

@IonicPage()
@Component({
  selector: 'page-mis-pedidos',
  templateUrl: 'mis-pedidos.html',
})
export class MisPedidosPage {

  pedidos = [];
  token: string;
  user: any;
  isAuth: boolean;
  nocturno = [];
  carro = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _data: DataProvider,
    private _auth: AuthProvider
  ) {

  }

  ionViewDidLoad() {
    this._auth.authState.subscribe((data: any) => {
      if (data.isAuth) {
        const user = data.authData.user;
        const token = data.authData.token;
        this.getPedidos(token, user._id);
      }
    });
  }

  getPedidos(token, id) {
    this._data.misPedidos(token, id)
      .then((data: any) => {
        this.pedidos = data[0].carro;
      });
  }

  openContentNormal(compra) {
    this.navCtrl.push(MisPedidosContentPage, { compra });
  }

}
