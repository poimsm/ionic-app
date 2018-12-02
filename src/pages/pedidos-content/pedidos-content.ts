import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the PedidosContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-pedidos-content",
  templateUrl: "pedidos-content.html"
})
export class PedidosContentPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}
  back() {
    this.navCtrl.pop();
  }
}
