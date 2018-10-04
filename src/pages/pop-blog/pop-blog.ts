import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-pop-blog",
  templateUrl: "pop-blog.html"
})
export class PopBlogPage {
  selection = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  selectOpt(opt) {
    this.selection = opt;
  }
}
