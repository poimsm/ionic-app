import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-store-apply",
  templateUrl: "store-apply.html"
})
export class StoreApplyPage {
  nombre: string;
  tienda: string;
  telefono: number;
  email: string;
  categoria: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  save() {
    console.log("guardado");
  }
}
