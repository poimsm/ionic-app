import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-mis-compras',
  templateUrl: 'mis-compras.html',
})
export class MisComprasPage {

  compras: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _auth: AuthProvider,
    private _data: DataProvider
    ) {
    this.fetchCompras();
  }

  async fetchCompras() {
    const retrieve: any = await this._auth.loadStorage();
    const token = retrieve.token;
    const user = retrieve.user; 

    this._data.misCompras(token, user._id).
    then(data => this.compras = data);
  }

}
