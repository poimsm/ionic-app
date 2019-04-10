import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tienda-mascotas-agenda',
  templateUrl: 'tienda-mascotas-agenda.html',
})
export class TiendaMascotasAgendaPage {

  semana = [
    {
      nombre: 'Lun'
    },
    {
      nombre: 'Mar'
    },
    {
      nombre: 'Mié'
    },
    {
      nombre: 'Jue'
    },
    {
      nombre: 'Vie'
    },
    {
      nombre: 'Sáb'
    },
    {
      nombre: 'Dom'
    }
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TiendaMascotasAgendaPage');
  }

}
