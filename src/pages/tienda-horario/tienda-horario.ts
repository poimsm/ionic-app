import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tienda-horario',
  templateUrl: 'tienda-horario.html',
})
export class TiendaHorarioPage {
  dia = 'Lunes'
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  select(dia) {
    this.dia = dia;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TiendaHorarioPage');
  }

}
