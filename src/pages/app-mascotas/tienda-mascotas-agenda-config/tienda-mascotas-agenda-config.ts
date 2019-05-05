import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tienda-mascotas-agenda-config',
  templateUrl: 'tienda-mascotas-agenda-config.html',
})
export class TiendaMascotasAgendaConfigPage {

  minAnticipacion: number;

  constructor(
    private viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  close() {
    const data = {
      minAnticipacion: this.minAnticipacion
    }
    this.viewCtrl.dismiss(data);
  }

}
