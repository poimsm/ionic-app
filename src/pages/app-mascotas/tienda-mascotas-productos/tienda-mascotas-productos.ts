import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MascotasProvider } from '../../../providers/mascotas/mascotas';
import { MascotasOfertaPage } from '../mascotas-oferta/mascotas-oferta';

@IonicPage()
@Component({
  selector: 'page-tienda-mascotas-productos',
  templateUrl: 'tienda-mascotas-productos.html',
})
export class TiendaMascotasProductosPage {
  cupones = [];
  tiendaID: string;
  tienda: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _mascotas: MascotasProvider
  ) {
    this.tiendaID = this.navParams.get('tiendaID');
    this.tienda = this.navParams.get('tienda');
    this.loadCupones();
  }

  loadCupones() {
    this._mascotas.getCuponesPorTienda(this.tiendaID)
      .then((data: any) => this.cupones = data);
  }

  openCupon(cupon) {
    this.navCtrl.push(MascotasOfertaPage, {
      cupon: cupon,
      tienda: this.tienda,
      mostrarCuponPagar: false
    });
  }

}
