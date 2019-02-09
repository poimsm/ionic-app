import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  PopoverController
} from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
import { CategoriasPage } from '../categorias/categorias';

@IonicPage()
@Component({
  selector: 'page-tienda-ecommerce-productos',
  templateUrl: 'tienda-ecommerce-productos.html',
})
export class TiendaEcommerceProductosPage {
  data = [];
  token = '';
  tiendaID: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private _data: DataProvider
  ) {
    this.tiendaID = this.navParams.get('tiendaID');
  }

  ionViewDidLoad() {
    this.getProductos();
  }

  borrarProducto(id) {
    this._data.deleteProductEcommerce(id)
      .then(() => {
        this._data.updateTotalProductsTienda(this.tiendaID, -1);
        this.getProductos();
      });
  }

  presentPopover(myEvent, id) {
    const opciones = {
      0: 'Eliminar producto'
    }
    const popover = this.popoverCtrl.create(CategoriasPage, opciones);
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(data => {
      if (data) {
        this.borrarProducto(id);
      }
    });
  }

  getProductos() {
    this._data.ecommerceByTiendID(this.tiendaID)
      .then((data: any[]) => {
        this.data = data;
      });
  }
}
