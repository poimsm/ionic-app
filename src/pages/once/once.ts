import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  PopoverController,
  AlertController
} from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
import { OnceContentPage } from "../once-content/once-content";
import { CategoriasPage } from '../categorias/categorias';
import { PopupsProvider } from "../../providers/popups/popups";
import { LocalizacionProvider } from '../../providers/localizacion/localizacion';

@IonicPage()
@Component({
  selector: 'page-once',
  templateUrl: 'once.html',
})
export class OncePage {
  categorias = [];
  categoriasObj = {};
  data = [];
  token = '';
  categoriaActual = null;
  skip = 0;
  limit = 5;
  hayMas = true;
  sorpresas = [];
  precios = [];
  isCategoria: boolean;
  categoria: string;
  ciudad: string;

  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private _data: DataProvider,
    private _popups: PopupsProvider,
    private _localizacion: LocalizacionProvider
  ) {
    this.isCategoria = this.navParams.get('isCategoria');
    this.categoria = this.navParams.get('categoria');
    this.ciudad = this.navParams.get('ciudad');
  }

  ionViewDidLoad() {
    if (this.isCategoria) {
      this.getOnceByCategory(this.categoria, this.ciudad);
    } else {
      this.getOnceByCategory(null, this.ciudad);
    }
    this.getSorpresas();
    // this.presentAlert();
    this.setUp();
  }

  setUp() {
    this.categoriasObj = this._popups.categoriasOnce;
    Object.keys(this.categoriasObj).forEach(key => {
      this.categorias.push(this.categoriasObj[key]);
    });
  }

  getSorpresas() {
    this._data.fetchSorpresa().then((data: any) => this.sorpresas = data)
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Valdivia',
      subTitle: 'Servicio disponible en Valdivia',
      buttons: ['Ok']
    });
    alert.present();
  }

  openOnce(once) {
    this.navCtrl.push(OnceContentPage, { once });
  }

  setLocalizacion() {
    this._localizacion.seleccionarCiudad()
      .then((data: any) => {
        if (data.ok) {
          this.ciudad = data.ciudad;
          this.getOnceByCategory(null, data.ciudad);
        }
      });
  }

  presentPopover(myEvent) {
    const popover = this.popoverCtrl.create(CategoriasPage, this.categoriasObj);
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(data => {
      if (data) {
        this.categoria = this.categorias[data.index];
        this.getOnceByCategory(this.categorias[data.index], this.ciudad);
      }
    });
  }

  async getOnceByCategory(categoria, ciudad) {
    const route = 'apps/once-all';

    this._data.getAll(0, 10, categoria, ciudad, route)
      .then((data: any[]) => {
        this.data = data;
      });
  }

  doInfinite(infiniteScroll) {
    const route = 'apps/once-all';
    this.skip += 10;
    this._data.getAll(this.skip, 10, this.categoria, this.ciudad, route)
      .then((data: any[]) => {
        if (data.length == 0) {
          this.hayMas = false;
        }
        this.data = this.data.concat(data);
        infiniteScroll.complete();
      });
  }


}
