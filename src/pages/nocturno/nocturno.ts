import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NocturnoContentPage } from '../nocturno-content/nocturno-content';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-nocturno',
  templateUrl: 'nocturno.html',
})
export class NocturnoPage {

  tiendas = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _data: DataProvider
  ) {
  }

  ionViewDidLoad() {
    this._data.fetchNocturno().then((data: any) => this.tiendas = data)
  }

  openContent(isOpen, tienda) {
    if (!isOpen) {
      return
    }
    console.log(tienda);

    this.navCtrl.push(NocturnoContentPage, { tienda });
  }

}
