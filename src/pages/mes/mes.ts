import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";

/**
 * Generated class for the MesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-mes",
  templateUrl: "mes.html"
})
export class MesPage {
  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  close() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MesPage");
  }
}
