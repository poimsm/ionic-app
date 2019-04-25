import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MascotasContentPage } from '../mascotas-content/mascotas-content';
import { SuperPage } from '../../app-super/super/super';
import { SeccionesProvider } from '../../../providers/secciones/secciones';
import { Subscription } from 'rxjs/Subscription';


@IonicPage()
@Component({
  selector: 'page-mascotas',
  templateUrl: 'mascotas.html',
})
export class MascotasPage {

  tiendas = [];
  subscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _secciones: SeccionesProvider
  ) {
    _secciones.cambiarTipo('mascotas');
  }

  ionViewWillEnter() {
    this.subscription = this._secciones.tiendas.subscribe(data => {
      console.log(data)
    }
      );
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  openContent() {
    this.navCtrl.push(MascotasContentPage);
  }

  openSuper() {
    this.navCtrl.push(SuperPage, { tipo: 'mascotas' });
  }

}
