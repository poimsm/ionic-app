import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SeccionesProvider } from '../../../providers/secciones/secciones';
import { EstiloContentPage } from '../estilo-content/estilo-content';


@IonicPage()
@Component({
  selector: 'page-estilo',
  templateUrl: 'estilo.html',
})
export class EstiloPage {

  popular = [
    'https://res.cloudinary.com/ddon9fx1n/image/upload/v1552586651/restaurar_muebles_madera.jpg',
    'https://res.cloudinary.com/ddon9fx1n/image/upload/v1552586651/restaurar_muebles_madera.jpg',
    'https://res.cloudinary.com/ddon9fx1n/image/upload/v1552586651/restaurar_muebles_madera.jpg'

  ]
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _secciones: SeccionesProvider
    ) {
      _secciones.cambiarTipo('estilo');
  }

  openContent() {
    this.navCtrl.push(EstiloContentPage);
  }

}
