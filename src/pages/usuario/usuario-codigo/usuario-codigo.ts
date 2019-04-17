import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-usuario-codigo',
  templateUrl: 'usuario-codigo.html',
})
export class UsuarioCodigoPage {
  codigo = '239842';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsuarioCodigoPage');
  }

}
