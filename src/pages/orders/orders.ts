import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  PopoverController
} from "ionic-angular";
import { PopCategoriasPage } from "../pop-categorias/pop-categorias";
import { OrdersContentPage } from "../orders-content/orders-content";

/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-orders",
  templateUrl: "orders.html"
})
export class OrdersPage {
  constructor(
    public popoverCtrl: PopoverController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  presentPopover(myEvent) {
    const popover = this.popoverCtrl.create(PopCategoriasPage, {
      0: "Ordenes entrantes",
      1: "Ordenes pendientes",
      2: "Ordenes tomadas"
    });
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(data => {
      console.log(data);
    });
  }
  openOrder() {
    this.navCtrl.push(OrdersContentPage);
  }
}
