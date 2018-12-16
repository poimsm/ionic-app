import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  PopoverController
} from "ionic-angular";
import { PopCategoriasPage } from "../pop-categorias/pop-categorias";
import { AuthProvider } from "../../providers/auth/auth";
import { DataProvider } from "../../providers/data/data";
import { CuponContentPage } from "../cupon-content/cupon-content";

@IonicPage()
@Component({
  selector: "page-cupon",
  templateUrl: "cupon.html"
})
export class CuponPage {
  category = [
    "Productos",
    "Spa bienestar & belleza",
    "Comida",
    "Servicios",
    "Deportes & Panoramas"
  ];

  coupons = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private _auth: AuthProvider,
    private _data: DataProvider
  ) {
    this.fetchByCategory(-1);
  }

  openCupon(cupon) {
    this.navCtrl.push(CuponContentPage, {cupon});
  }
  presentPopover(myEvent) {
    const popover = this.popoverCtrl.create(PopCategoriasPage, {
      0: "Productos",
      1: "Spa bienestar & belleza",
      2: "Comida",
      3: "Servicios",
      4: "Panoramas"
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
    .then((data: any[]) => {this.coupons = data;console.log(data);
    });
  }

  async fetchBest() {
    const retrieve: any = await this._auth.loadStorage();
    const token = retrieve.token;
    const path = 'best/explore-services';
    this._data.getAll(token, 999, 999, "", path)
    .then((data: any[]) => {this.coupons = data;console.log(data);
    });
  }

  async fetchByCategory(index) {
    const retrieve: any = await this._auth.loadStorage();
    const token = retrieve.token;
    const path = 'apps/coupons';
    let select = "";

    if (index == -1) {
      select = null;
    } else {
      select = this.category[index];      
    }    
    this._data.getAll(token, 0, 10, select, path)
    .then((data: any[]) => this.coupons = data);
  }

}
