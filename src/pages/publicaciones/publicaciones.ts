import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from "ionic-angular";
import { SubirProvider } from "../../providers/subir/subir";
import { AuthProvider } from "../../providers/auth/auth";
import { take } from "rxjs/operators";
import { FiltrosPage } from "../filtros/filtros";
import { BrowserProvider } from "../../providers/browser/browser";

@IonicPage()
@Component({
  selector: "page-publicaciones",
  templateUrl: "publicaciones.html"
})
export class PublicacionesPage {
  categorias = [];
  outfits = [];
  mostrar = "outfit";
  ordenar = "cronologico";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _auth: AuthProvider,
    private _subir: SubirProvider,
    private modalCtrl: ModalController,
    private _browser: BrowserProvider
  ) {
    // this.fetchOutfits();
  }
  // ionViewDidEnter() {
  //   let options = this._browser.get();
  //   this.mostrar = options[0];
  //   this.ordenar = options[1];
  //   console.log("aca", options);
  // }
  openFiltros() {
    // this.navCtrl.push(FiltrosPage);
    let modal = this.modalCtrl.create(FiltrosPage);
    modal.present();
    modal.onDidDismiss(data => {
      console.log(data);
      if (data.mostrar && data.ordernar) {
        this.mostrar = data.mostrar;
        this.ordenar = data.ordenar;
      }
    });
  }
  hola() {
    console.log(this.outfits);
  }
  async fetchOutfits() {
    const categories = [];
    const id = this._auth.authData.userId;
    const user: any = await this._auth
      .getUser()
      .pipe(take(1))
      .toPromise();
    Object.keys(user[0].categories).forEach(key => {
      categories.push(user[0].categories[key]);
    });
    this._subir
      .getOutfitByUserId(categories, id)
      .subscribe(data => this.outfits.push(data[0]));
  }
}
