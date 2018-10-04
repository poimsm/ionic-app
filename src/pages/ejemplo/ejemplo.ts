import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-ejemplo",
  templateUrl: "ejemplo.html"
})
export class EjemploPage {
  uno = true;
  dos = true;
  tres = true;

  arr38 = [
    "Negro",
    "Burdeo",
    "Azul Marino",
    "Marengo(Gris oscuro)",
    "Melange(Gris claro)"
  ];
  arr40 = ["Burdeo", "Azul marino", "Azul Rey", "Marengo(Gris oscuro)"];
  arrL = ["Negro", "Marengo(Gris oscuro)", "Melange(Gris claro)"];
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad EjemploPage");
  }
}
