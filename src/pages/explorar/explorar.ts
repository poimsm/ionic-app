import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  PopoverController
} from "ionic-angular";
import { ExplorarContentPage } from "../explorar-content/explorar-content";
import { PopCategoriasPage } from "../pop-categorias/pop-categorias";

@IonicPage()
@Component({
  selector: "page-explorar",
  templateUrl: "explorar.html"
})
export class ExplorarPage {
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

  openPage() {
    this.navCtrl.push(ExplorarContentPage);
  }
}
