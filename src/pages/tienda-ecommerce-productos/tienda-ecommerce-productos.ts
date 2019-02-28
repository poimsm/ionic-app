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
  promocion: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private _data: DataProvider
  ) {
    this.tiendaID = this.navParams.get('tiendaID');
    this.promocion = this.navParams.get('promocion');
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
    // let opciones: any = {
    //   0: 'Desactivar producto'
    // }

    // if (this.promocion.isActive) {
    //   opciones[1] = 'Aplicar promoción de lanzamiento'
    // }

    // const popover = this.popoverCtrl.create(CategoriasPage, opciones);
    // popover.present({
    //   ev: myEvent
    // });

    // popover.onDidDismiss(data => {
    //   if (data) {
    //     this.borrarProducto(id);
    //   }
    // });
  }

  getProductos() {
    this._data.ecommerceByTiendID(this.tiendaID)
      .then((data: any[]) => {
        this.data = data;
      });
  }
}
