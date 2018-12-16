import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-post-servicios',
  templateUrl: 'post-servicios.html',
})
export class PostServiciosPage {

  turn_domicilio = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostServiciosPage');
  }

}
