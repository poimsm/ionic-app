import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-cesta-cupon',
  templateUrl: 'cesta-cupon.html',
})
export class CestaCuponPage {

  data: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
    ) {
    this.data = navParams.get('cupon');
    console.log(this.data);    
  }
}
