import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { DataProvider } from '../../providers/data/data';
import { CarroContentPage } from '../carro-content/carro-content';


@IonicPage()
@Component({
  selector: 'page-carro',
  templateUrl: 'carro.html',
})
export class CarroPage {

  comprasEcommerce: any = [];
  comprasOnce: any = [];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _auth: AuthProvider,
    private _data: DataProvider
  ) { }

  openContent(compra) {
    this.navCtrl.push(CarroContentPage, { compra })
  }

  ionViewDidLoad() {
    this._auth.authState.subscribe((data: any) => {
      if (data.isAuth) {
        const token = data.authData.token;
        const user = data.authData.user;
        this._data.misComprasEcommerce(token, user._id).
          then(data => this.comprasEcommerce = data);
        this._data.misComprasOnce(token, user._id).
          then(data => this.comprasOnce = data);
      }
    });
  }

}
