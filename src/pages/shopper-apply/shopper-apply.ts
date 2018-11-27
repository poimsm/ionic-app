import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-shopper-apply',
  templateUrl: 'shopper-apply.html',
})
export class ShopperApplyPage {

  nombre: string;
  telefono: number;
  email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  save() {
    console.log("guardado");
    
  }

}
