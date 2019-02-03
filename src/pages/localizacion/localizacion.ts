import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { LocalizacionProvider } from '../../providers/localizacion/localizacion';


@IonicPage()
@Component({
  selector: 'page-localizacion',
  templateUrl: 'localizacion.html',
})
export class LocalizacionPage {

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private _localizacion: LocalizacionProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocalizacionPage');
  }

  close() {
    this.viewCtrl.dismiss({ ok: false });
  }

  select(ciudad) {
    this.viewCtrl.dismiss({ ok: true, ciudad });
  }

}
