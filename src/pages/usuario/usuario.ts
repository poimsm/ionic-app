import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TiendaAlgoDulcePage } from '../tienda-algo-dulce/tienda-algo-dulce';
import { TiendaComidaPage } from '../tienda-comida/tienda-comida';

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {
  tiendaID: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tiendaID = this.navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsuarioPage');
  }

  openTienda() {
    this.navCtrl.push(TiendaComidaPage, { id: this.tiendaID });
  }

}
