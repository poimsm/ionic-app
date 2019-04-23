import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SemanaProvider } from '../../../providers/semana/semana';


@IonicPage()
@Component({
  selector: 'page-tienda-mascotas-agenda',
  templateUrl: 'tienda-mascotas-agenda.html',
})
export class TiendaMascotasAgendaPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    public _semana: SemanaProvider
    ) { }

 
  close() {
    this._semana.close();
    this.viewCtrl.dismiss();
  }

}
