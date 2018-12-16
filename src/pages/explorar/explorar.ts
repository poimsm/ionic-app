import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  PopoverController
} from "ionic-angular";
import { ExplorarContentPage } from "../explorar-content/explorar-content";
import { PopCategoriasPage } from "../pop-categorias/pop-categorias";
import { DataProvider } from '../../providers/data/data';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: "page-explorar",
  templateUrl: "explorar.html"
})
export class ExplorarPage {
  category = [
    'Tours y paseos',
    'Deportes y aventura',
    'Talleres y cursos',
    'Cosas que puedo comprar',
    'Eventos'
  ];

  data = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private _data: DataProvider,
    private _auth: AuthProvider
  ) {
    this.fetchBest()
    // this.fetchByCategory(-1);
  }

  presentPopover(myEvent) {
    const popover = this.popoverCtrl.create(PopCategoriasPage, {
      0: "Tours y paseos",
      1: "Deportes y aventura",
      2: "Talleres y cursos",
      3: "Cosas que puedo comprar",
      4: "Eventos"
    });
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(data => {
      if (data) {
        this.fetchByCategory(data.index);
      }
    });
  }

  async fetchOne(id) {
    const retrieve: any = await this._auth.loadStorage();
    const token = retrieve.token;
    const path = 'best/explore-services';
    this._data.getOne(token, id, path)
    .then((data: any[]) => {this.data = data;console.log(data);
    });
  }

  async fetchBest() {
    const retrieve: any = await this._auth.loadStorage();
    const token = retrieve.token;
    const path = 'best/explore-services';
    this._data.getAll(token, 999, 999, "", path)
    .then((data: any[]) => {this.data = data;console.log(data);
    });
  }

  async fetchByCategory(index) {
    const retrieve: any = await this._auth.loadStorage();
    const token = retrieve.token;
    const path = 'apps/explore/services';
    let select = "";

    if (index == -1) {
      select = null;
    } else {
      select = this.category[index];      
    }
    this._data.getAll(token, 0, 10, select, path)
    .then((data: any[]) => this.data = data);
  }

  openPage() {
    this.navCtrl.push(ExplorarContentPage);
  }
}
