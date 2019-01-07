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
    this.categoriasObj = this._popups.categoriasOnce;
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

  openOnce(once) {
    this.navCtrl.push(OnceContentPage, { once });
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

  async fetchByCategory(categoria) {
    const route = 'apps/once-all';

    this._data.getAll(0, 10, categoria, route)
      .then((data: any[]) => this.data = data);
  }

}
