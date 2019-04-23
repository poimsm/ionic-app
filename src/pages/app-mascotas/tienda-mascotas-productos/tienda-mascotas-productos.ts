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
  data = [];
  tiendaID: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _mascotas: MascotasProvider
  ) {
    this.tiendaID = this.navParams.get('tiendaID');
    this.obtenerData();
  }

  obtenerData() {
    this._mascotas.getCuponesPorTienda(this.tiendaID)
      .then((data: any) => this.data = data);
  }

  openCupon(cupon) {
    this.navCtrl.push(MascotasOfertaPage, {
      tipo: 'mascotas',
      payload: cupon,
      from: 'tienda-mascotas'
    });
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad TiendaMascotasProductosPage');
  }

}
