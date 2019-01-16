import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FrutasContentPage } from '../frutas-content/frutas-content';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-frutas',
  templateUrl: 'frutas.html',
})
export class FrutasPage {

  tiendas = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _data: DataProvider
  ) {
  }

  ionViewDidLoad() {
    this._data.fetchFruta().then((data: any) => this.tiendas = data)
  }

  openTienda(tienda) {
    this.navCtrl.push(FrutasContentPage, { tienda })
  }

}
