import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MueblesContentPage } from '../muebles-content/muebles-content';


@IonicPage()
@Component({
  selector: 'page-muebles',
  templateUrl: 'muebles.html',
})
export class MueblesPage {

  showShopping = false;

  popular = [
    {
      titulo: 'Muebles Bar Para Casa',
      precio: '$54.990',
      img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1553515892/fotos-muebles-bar-para-casa-mueblebar-mueble-para-cocktail-ingl-s-a-os-50.jpg'
    },
    {
      titulo: 'Juegos de muebles madera maciza de pino escritorio + estantería + sillas mesa de estudio niños establece minimalista 120*60*195 cm',
      precio: '$81.000',
      img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1553515892/Juegos-de-muebles-madera-maciza-de-pino-escritorio-estanter-a-sillas-mesa-de-estudio-ni-os.jpg_640x640.webp'
    },
    {
      titulo: 'Mueble de Salón de 200 cms.',
      precio: '$67.500',
      img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1553515891/ACARA-mueble-tv-BAMBU-D-0796-01-10-004_m.jpg'
    }
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openContent() {
    this.navCtrl.push(MueblesContentPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MueblesPage');
  }

}
