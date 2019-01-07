import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { BandejaContentPage } from '../bandeja-content/bandeja-content';
import { CategoriasPage } from '../categorias/categorias';

@IonicPage()
@Component({
  selector: 'page-bandeja',
  templateUrl: 'bandeja.html',
})
export class BandejaPage {
  compras: any = [];
  content = BandejaContentPage;

  categorias = ['once', 'ecommerce'];
  type = 'once';

  data = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _data: DataProvider,
    public popoverCtrl: PopoverController
  ) { }

  ionViewDidLoad() {
    this._data.deliveryOnce().
      then(data => this.compras = data);
  }

  openPage(compra) {
    this.navCtrl.push(BandejaContentPage, { compra });
  }

  presentPopover(myEvent) {
    const popover = this.popoverCtrl.create(CategoriasPage, {
      0: "Once",
      1: "Compras"
    });
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(data => {
      if (data) {
        this.type = this.categorias[data.index];
        this.fetchByCategory(this.categorias[data.index]);
      }
    });
  }

  fetchByCategory(categoria) {

    if (categoria == 'once') {

      this._data.deliveryOnce()
        .then((data: any[]) => this.compras = data);
    } else {

      this._data.deliveryEcommerce()
        .then((data: any[]) => this.compras = data)
    }

  }

}
