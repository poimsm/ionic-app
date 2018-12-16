import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { DataProvider } from '../../providers/data/data';


@IonicPage()
@Component({
  selector: 'page-cupon-content',
  templateUrl: 'cupon-content.html',
})
export class CuponContentPage {
  cupon: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _auth: AuthProvider,
    private _data: DataProvider
    ) {
    this.cupon = navParams.get('cupon');
  }

  async comprar() {

    const retrieve: any = await this._auth.loadStorage();
    const token = retrieve.token;

    const data = {
      coupon: this.cupon._id,
      store: this.cupon.store      
    }

    this._data.buyOneCoupon(token, data)
    .then(res => console.log(res));
    
  }

}
