import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ExplorarContentPage } from "../explorar-content/explorar-content";

@IonicPage()
@Component({
  selector: "page-explorar",
  templateUrl: "explorar.html"
})
export class ExplorarPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  openPage() {
    this.navCtrl.push(ExplorarContentPage);
  }
}
