import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController
} from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-subproducto",
  templateUrl: "subproducto.html"
})
export class SubproductoPage {
  subProduct: any;
  uno = true;
  dos = true;
  tres = true;
  arr38 = [
    "Negro",
    "Burdeo",
    "Azul Marino",
    "Marengo(Gris oscuro)",
    "Melange(Gris claro)"
  ];
  arr40 = ["Burdeo", "Azul marino", "Azul Rey", "Marengo(Gris oscuro)"];
  arrL = ["Negro", "Marengo(Gris oscuro)", "Melange(Gris claro)"];
  product = {};
  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.product = this.navParams.data;
    console.log(this.product);
    // _product
    //   .getSubProducts(data.id, data.prenda)
    //   .subscribe(x => console.log(x));
  }
  back() {
    this.navCtrl.pop();
  }
}
