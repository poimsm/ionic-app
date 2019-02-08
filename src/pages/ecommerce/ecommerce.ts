import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  PopoverController,
  AlertController
} from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
import { CategoriasPage } from '../categorias/categorias';
import { PopupsProvider } from "../../providers/popups/popups";
import { EcommerceContentPage } from "../ecommerce-content/ecommerce-content";



@IonicPage()
@Component({
  selector: 'page-ecommerce',
  templateUrl: 'ecommerce.html',
})
export class EcommercePage {
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
    private _popups: PopupsProvider
  ) {
    this.isCategoria = this.navParams.get('isCategoria');
    this.categoria = this.navParams.get('categoria');
    this.ciudad = this.navParams.get('ciudad');
  }

  ionViewDidLoad() {
    if (this.isCategoria) {
      this.getOnceByCategory(this.categoria);
    } else {
      this.getOnceByCategory(null);
    }
    this.setUp();
  }

  setUp() {
    this.categoriasObj = this._popups.categoriasEcommerce;
    Object.keys(this.categoriasObj).forEach(key => {
      this.categorias.push(this.categoriasObj[key]);
    });
  }

  openOnce(once) {
    this.navCtrl.push(EcommerceContentPage, { once });
  }

  presentPopover(myEvent) {
    const popover = this.popoverCtrl.create(CategoriasPage, this.categoriasObj);
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(data => {
      if (data) {
        this.categoria = this.categorias[data.index];
        this.getOnceByCategory(this.categorias[data.index]);
      }
    });
  }

  async getOnceByCategory(categoria) {
    const route = 'apps/ecommerce-all';

    this._data.getAll(0, 10, categoria, this.ciudad, route)
      .then((data: any[]) => {
        this.data = data;
      });
  }

  doInfinite(infiniteScroll) {
    const route = 'apps/ecommerce-all';
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
