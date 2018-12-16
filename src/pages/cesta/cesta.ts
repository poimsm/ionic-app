import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CestaCuponPage } from '../cesta-cupon/cesta-cupon';
import { AuthProvider } from '../../providers/auth/auth';
import { DataProvider } from '../../providers/data/data';


@IonicPage()
@Component({
  selector: 'page-cesta',
  templateUrl: 'cesta.html',
})
export class CestaPage {

 coupons = [];


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _auth: AuthProvider,
    private _data: DataProvider
    ) {

    this.misCupones();
  }

  openCupon(cupon) {
    this.navCtrl.push(CestaCuponPage, {cupon})
  }

  async misCupones() {

    const retrieve: any = await this._auth.loadStorage();
    const token = retrieve.token;

    this._data.myCoupons(token)
    .then((data: any) => this.coupons = data);

  }

}
