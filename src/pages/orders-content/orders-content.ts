import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-orders-content",
  templateUrl: "orders-content.html"
})
export class OrdersContentPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  accept() {
    console.log("aceptado");
  }
}
