import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-post-estudiante',
  templateUrl: 'post-estudiante.html',
})
export class PostEstudiantePage {
  turn_domicilio = true;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostEstudiantePage');
  }

}
