import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  PopoverController
} from "ionic-angular";
import { PopCategoriasPage } from "../pop-categorias/pop-categorias";
import { AuthProvider } from '../../providers/auth/auth';
import { DataProvider } from '../../providers/data/data';
import { CuponContentPage } from '../cupon-content/cupon-content';

@IonicPage()
@Component({
  selector: "page-cupon",
  templateUrl: "cupon.html"
})
export class CuponPage {

  categorias = [
    "Productos",
    "Spa bienestar & belleza",
    "Comida",
    "Servicios",
    "Deportes & Panoramas"
  ]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private _auth: AuthProvider,
    private _data: DataProvider
  ) {}

  openCupon() {
    this.navCtrl.push(CuponContentPage)
  }
  presentPopover(myEvent) {
    const popover = this.popoverCtrl.create(PopCategoriasPage, {
      0: "Productos",
      1: "Spa bienestar & belleza",
      2: "Comida",
      3: "Servicios",
      4: "Deportes & Panoramas"
    });
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(data => {      
      this.queryCategory(this.categorias[data.index]);
    });
  }

  queryCategory(categoria) {
    const skip = 0;
    const limit = 4;
    const category = categoria;
    const route = 'coupons';
    console.log(category);
    
    
    this._data.get(this._auth.token, route, skip, limit, category)
    .then(res => console.log(res))
  }

}
