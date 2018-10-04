import { Component } from "@angular/core";
import { IonicPage, ViewController, NavParams } from "ionic-angular";

/**
 * Generated class for the ReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-review",
  templateUrl: "review.html"
})
export class ReviewPage {
  constructor(public viewCtrl: ViewController, public navParams: NavParams) {}

  closeModal() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ReviewPage");
  }
}
