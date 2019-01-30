import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';


@IonicPage()
@Component({
  selector: 'page-tienda-producto',
  templateUrl: 'tienda-producto.html',
})
export class TiendaProductoPage {

  tipo: string;
  tiendaID: string;
  productos = [];
  variedades = [];
  tamanos = [];
  tematicas = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _data: DataProvider
  ) {
    this.tipo = this.navParams.get('tipo');
    this.tiendaID = this.navParams.get('tiendaID');
  }

  ionViewDidLoad() {
    this._data.onceByTiendID(this.tiendaID)
      .then((data: any) => this.productos = data);
  }

  // fetchProductos() {
  //   this._data.onceByTiendID(this.tiendaID)
  //   .then((data: any) => this.productos = data);
  // }

  // doInfinite(infiniteScroll) {
  //   const route = 'apps/once-all';
  //   this.skip += 10;
  //   this._data.getAll(this.skip, 10, this.categoriaActual, route)
  //     .then((data: any[]) => {
  //       if (data.length == 0) {
  //         this.hayMas = false;
  //       }
  //       this.data = this.data.concat(data);
  //       infiniteScroll.complete();
  //     });
  // }

}
