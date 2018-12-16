import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { DataProvider } from '../../providers/data/data';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: "page-store-apply",
  templateUrl: "store-apply.html"
})
export class StoreApplyPage {
  nombre: string;
  nombreTienda: string;
  telefono: number;
  email: string;
  categoria: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _data: DataProvider,
    private _auth: AuthProvider
    ) {}

  async save() {

    const retrieve: any = await this._auth.loadStorage();
    const token = retrieve.token;

    const body = {
      name: this.nombreTienda,
      phone: this.telefono,
      email: this.email,
      category: this.categoria
    }

    this._data.storeApply(token, body)
    .then(data => {console.log(data);
    });
  }
}
