import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioCodigoPage } from '../usuario-codigo/usuario-codigo';


@IonicPage()
@Component({
  selector: 'page-usuario-historial',
  templateUrl: 'usuario-historial.html',
})
export class UsuarioHistorialPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openCodigo() {
    this.navCtrl.push(UsuarioCodigoPage);
  }

}
