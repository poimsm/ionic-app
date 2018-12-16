import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-shopper-apply',
  templateUrl: 'shopper-apply.html',
})
export class ShopperApplyPage {

  nombre: string;
  telefono: number;
  email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _data:DataProvider, private _auth:AuthProvider) {
  }

  async save() {

    const retrieve: any = await this._auth.loadStorage();
    const token = retrieve.token;

    const body = {
      name: this.nombre,
      phone: this.telefono,
      email: this.email
    }

    this._data.deliveryApply(token, body)
    .then(data => {console.log(data);
    });
  }

}
