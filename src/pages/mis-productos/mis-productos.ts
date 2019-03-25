import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MisProductosContentPage } from '../mis-productos-content/mis-productos-content';

@IonicPage()
@Component({
  selector: 'page-mis-productos',
  templateUrl: 'mis-productos.html',
})
export class MisProductosPage {

  productos = [
    'https://res.cloudinary.com/ddon9fx1n/image/upload/v1552591316/asfsafr.jpg',
    'https://res.cloudinary.com/ddon9fx1n/image/upload/v1552591316/tttrg.jpg',
    'https://res.cloudinary.com/ddon9fx1n/image/upload/v1552591316/ydfdgh.jpg',
    'https://res.cloudinary.com/ddon9fx1n/image/upload/v1552588624/Velador-augusta-moderno1.jpg',
    'https://res.cloudinary.com/ddon9fx1n/image/upload/v1552588171/mesa-de-centro-eleva.jpg',
    'https://res.cloudinary.com/ddon9fx1n/image/upload/v1552587649/c124e135c76d7c26b0.jpg'
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  openContent(i) {
    this.navCtrl.push(MisProductosContentPage, { img: this.productos[i] })
  }

}
