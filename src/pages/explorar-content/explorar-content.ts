import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from "ionic-angular";
import { ExplorarOrderPage } from "../explorar-order/explorar-order";
@IonicPage()
@Component({
  selector: "page-explorar-content",
  templateUrl: "explorar-content.html"
})
export class ExplorarContentPage {
  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  openCalendar() {
    this.navCtrl.push(ExplorarOrderPage);
    // const modal = this.modalCtrl.create(CalendarioPage);
    // modal.present();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ExplorarContentPage");
  }
}
