import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ProductProvider } from "../../providers/product/product";

@IonicPage()
@Component({
  selector: "page-market",
  templateUrl: "market.html"
})
export class MarketPage {
  products = [];
  category: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _product: ProductProvider
  ) {
    this.category = this.navParams.data.cat;
    console.log(this.category);
    this._product
      .getProducts(this.category, "fecha")
      .subscribe(data => (this.products = data));
  }
  openProduct() {}
}
