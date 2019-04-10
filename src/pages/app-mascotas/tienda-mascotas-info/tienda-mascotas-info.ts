import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tienda-mascotas-info',
  templateUrl: 'tienda-mascotas-info.html',
})
export class TiendaMascotasInfoPage {
  tipo: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
    ) {
  this.tipo = this.navParams.get('tipo');
  }
 
  close() {
    this.viewCtrl.dismiss();
  }

}
