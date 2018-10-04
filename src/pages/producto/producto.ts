import { Component } from "@angular/core";
import {
  IonicPage,
  ModalController,
  NavController,
  NavParams
} from "ionic-angular";
import { SubproductoPage } from "../subproducto/subproducto";
import { ReviewPage } from "../review/review";
import { SubirProvider } from "../../providers/subir/subir";

@IonicPage()
@Component({
  selector: "page-producto",
  templateUrl: "producto.html"
})
export class ProductoPage {
  producto: any;
  ids = [];
  prendas = [];
  products = [];
  outfit: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private _subir: SubirProvider
  ) {
    this.outfit = this.navParams.data;
    // this.ids = this.navParams.data;
    for (let i = 0; i < Object.keys(this.outfit.productIds).length; i++) {
      this.ids.push(this.outfit.productIds[i]);
    }
    console.log("IDS", this.ids);
    console.log("OUTFIT", this.outfit);

    _subir
      .getProductByOutfitId(this.ids)
      .subscribe(data => this.products.push(data[0]));

    // for (let i = 0; i < Object.keys(this.producto.items).length; i++) {
    //   this.prendas.push(this.producto.items[i]);
    // }
    // _product.getSubProducts;
  }
  openProduct(product) {
    this.navCtrl.push(SubproductoPage, product);
  }
  openPage(id, prenda) {
    this.navCtrl.push(SubproductoPage, { id, prenda });
  }
  openModal() {
    this.modalCtrl.create(ReviewPage).present();
  }
}
