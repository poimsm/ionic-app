import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SeccionesProvider } from '../../../providers/secciones/secciones';


@IonicPage()
@Component({
  selector: 'page-belleza',
  templateUrl: 'belleza.html',
})
export class BellezaPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _secciones: SeccionesProvider
    ) {
      _secciones.cambiarTipo('belleza');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BellezaPage');
  }

}
