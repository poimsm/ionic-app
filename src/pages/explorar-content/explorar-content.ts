import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from "ionic-angular";
import { CalendarioPage } from "../calendario/calendario";

/**
 * Generated class for the ExplorarContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    this.navCtrl.push(CalendarioPage);
    // const modal = this.modalCtrl.create(CalendarioPage);
    // modal.present();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ExplorarContentPage");
  }
}
