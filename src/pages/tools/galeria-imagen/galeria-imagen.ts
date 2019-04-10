import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-galeria-imagen',
  templateUrl: 'galeria-imagen.html',
})
export class GaleriaImagenPage {

  url: string;
  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.url = this.navParams.get('url');
    console.log(this.url);

  }

  close() {
    this.viewCtrl.dismiss();
  }

}
