import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  PopoverController,
  ModalController
} from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
import { CategoriasPage } from '../categorias/categorias';
import { InformacionesPage } from '../informaciones/informaciones';

@IonicPage()
@Component({
  selector: 'page-tienda-algo-dulce-productos',
  templateUrl: 'tienda-algo-dulce-productos.html',
})
export class TiendaAlgoDulceProductosPage {
  data = [];
  token = '';
  tiendaID: string;
  promocion: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private _data: DataProvider,
    public modalCtrl: ModalController
  ) {
    this.tiendaID = this.navParams.get('tiendaID');
    this.promocion = this.navParams.get('promocion');
  }

  ionViewDidLoad() {
    this.getProductos();
  }

  openInformaciones(tipo) {
    const modal = this.modalCtrl.create(InformacionesPage, { tipo });
    modal.onDidDismiss(data => {
    });
    modal.present();
  }

  cambiarEstadoProducto(id, flag) {
    this._data.changeStateProductOnce(id, flag)
      .then(() => {
        if (flag) {
          this._data.updateTotalProductsTienda(this.tiendaID, 1);
        } else {
          this._data.updateTotalProductsTienda(this.tiendaID, -1);
        }
        this.getProductos();
      });
  }

  aplicarPromocionLanzamiento(id) {
    this._data.promoLanzamientoOnce(id, this.tiendaID)
      .then(() => {
        this.getProductos();
      });
  }

  presentPopover(myEvent, id, esProductoActivo) {
    let opciones = {}

    if (esProductoActivo) {
      opciones[0] = 'Desactivar producto'
    } else {
      opciones[0] = 'Activar producto'
    }

    if (this.promocion.isActive) {
      opciones[1] = 'Aplicar promoción de lanzamiento'
    }

    const popover = this.popoverCtrl.create(CategoriasPage, opciones);
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(data => {

      if (data) {
        if (data.index == 0) {
          if (opciones[0] == 'Desactivar producto') {
            this.cambiarEstadoProducto(id, false);
          } else {
            this.cambiarEstadoProducto(id, true);
          }
        }
        if (data.index == 1) {
          this.aplicarPromocionLanzamiento(id);
        }
      }
    });
  }

  getProductos() {
    this._data.onceByTiendID(this.tiendaID)
      .then((data: any[]) => {
        this.data = data;
      });
  }
}
