import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-mis-ventas',
  templateUrl: 'mis-ventas.html',
})
export class MisVentasPage {

  items = [
    'https://res.cloudinary.com/ddon9fx1n/image/upload/v1552591316/tttrg.jpg',
    'https://res.cloudinary.com/ddon9fx1n/image/upload/v1552588624/Velador-augusta-moderno1.jpg',
    'https://res.cloudinary.com/ddon9fx1n/image/upload/v1552587649/c124e135c76d7c26b0.jpg'
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

 
}
