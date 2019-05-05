import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MascotasOfertaPage } from '../mascotas-oferta/mascotas-oferta';
import { MascotasPaquetePage } from '../mascotas-paquete/mascotas-paquete';

@IonicPage()
@Component({
  selector: 'page-mascotas-content',
  templateUrl: 'mascotas-content.html',
})
export class MascotasContentPage {

  equipo = [];
  cupones = [];
  comentarios = [];
  tienda: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.tienda = this.navParams.get('tienda');
  }


  openCupon(cupon) {
    this.navCtrl.push(MascotasOfertaPage, { 
      tienda: this.tienda,
      mostrarBotonPagar: true,
      cupon: cupon
    });
  }


  openPromo(tipo) {
    if (tipo == 'oferta') {
      this.navCtrl.push(MascotasOfertaPage, { tipo: 'mascotas', mostrarBotonPagar: true });
    } else {
      this.navCtrl.push(MascotasPaquetePage, { tipo: 'mascotas' });
    }
  }

}
