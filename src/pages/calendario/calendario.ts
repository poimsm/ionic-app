import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";

/**
 * Generated class for the CalendarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-calendario",
  templateUrl: "calendario.html"
})
export class CalendarioPage {
  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}
  close() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CalendarioPage");
  }
}
