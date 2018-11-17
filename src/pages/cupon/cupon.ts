import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  PopoverController
} from "ionic-angular";
import { PopCategoriasPage } from "../pop-categorias/pop-categorias";

@IonicPage()
@Component({
  selector: "page-cupon",
  templateUrl: "cupon.html"
})
export class CuponPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController
  ) {}
  presentPopover(myEvent) {
    const popover = this.popoverCtrl.create(PopCategoriasPage, {
      0: "Productos",
      1: "Bienestar & belleza",
      2: "Gastronomía",
      3: "Servicios",
      4: "Panoramas",
      5: "Eventos"
    });
    // popover.present();
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(data => {
      console.log(data);
      console.log("mmmmm");
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CuponPage");
  }
}
