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
  subTiendasInit: Subscription;
  subsTiendasCategoria: Subscription;

  tipo: string;
  categoria: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _secciones: SeccionesProvider
  ) {
    this.tipo = this.navParams.get('tipo');
    _secciones.cambiarTipo(this.tipo);
    this.initTiendas();
  }

  ionViewWillEnter() {
    this.loadTiendas();
  }

  initTiendas() {
    this._secciones.buscarTiendasPorTipo();
    this.subTiendasInit = this._secciones.todasLasTiendas.subscribe(data => {
      console.log(data);
      this.tiendas = data;
    });
  }

  loadTiendas() {
    this.subsTiendasCategoria = this._secciones.tiendas.subscribe(data => {
      console.log(data);
      this.tiendas = data;
    });
  }

  ionViewWillLeave() {
    this.subTiendasInit.unsubscribe();
    this.subsTiendasCategoria.unsubscribe();
  }

  openContent() {
    this.navCtrl.push(MascotasContentPage);
  }

 }
