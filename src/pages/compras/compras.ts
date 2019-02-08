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
import { ComprasContentPage } from '../compras-content/compras-content';
import { PopupsProvider } from "../../providers/popups/popups";

@IonicPage()
@Component({
  selector: 'page-compras',
  templateUrl: 'compras.html',
})
export class ComprasPage {
  categorias = [];
  categoriasObj = {};
  compras = [];
  token = '';

  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private _data: DataProvider,
    private _popups: PopupsProvider
  ) { }

  ionViewDidLoad() {
    this.fetchByCategory(null);
    this.presentAlert();
    this.setUp();
  }

  setUp() {
    this.categoriasObj = this._popups.categoriasEcommerce;
    Object.keys(this.categoriasObj).forEach(key => {
      this.categorias.push(this.categoriasObj[key]);
    });
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Valdivia',
      subTitle: 'Servicio disponible en Valdivia',
      buttons: ['Ok']
    });
    alert.present();
  }

  openPage(once) {
    this.navCtrl.push(ComprasContentPage, { once });
  }

  presentPopover(myEvent) {
    const popover = this.popoverCtrl.create(CategoriasPage, this.categoriasObj);
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(data => {
      if (data) {
        this.fetchByCategory(this.categorias[data.index]);
      }
    });
  }

  fetchByCategory(categoria) {
    const route = 'apps/ecommerce-all';

    // this._data.getAll(0, 10, categoria, route)
    //   .then((data: any[]) => this.compras = data);
  }

}

