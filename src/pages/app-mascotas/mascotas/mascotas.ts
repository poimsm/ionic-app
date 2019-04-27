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
  tipo: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _secciones: SeccionesProvider
  ) {
    this.tipo = this.navParams.get('tipo')
    _secciones.cambiarTipo(this.tipo);
    console.log(this.tipo);
    
  }

  ionViewWillEnter() {
    this.subscription = this._secciones.tiendas.subscribe(data => {
      console.log(data);
      this.tiendas = data;
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
