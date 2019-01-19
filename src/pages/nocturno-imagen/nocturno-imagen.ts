import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-nocturno-imagen',
  templateUrl: 'nocturno-imagen.html',
})
export class NocturnoImagenPage {
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
