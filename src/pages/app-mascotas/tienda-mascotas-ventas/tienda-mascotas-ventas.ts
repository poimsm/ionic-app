import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tienda-mascotas-ventas',
  templateUrl: 'tienda-mascotas-ventas.html',
})
export class TiendaMascotasVentasPage {

  tipo = 'todo';
  productos = [
    {
      img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1552591316/tttrg.jpg',
      cantidad: 'X1',
      isVerificado: false,
      precio: '$5.500',
      hora: '10:30',
      titulo: 'El mejor nivel de todos los niveles del mundo'
    },
    {
      img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1552588624/Velador-augusta-moderno1.jpg',
      cantidad: 'X3',
      isVerificado: false,
      precio: '$2.000',
      hora: '11:30',
      titulo: 'El mejor nivel de todos los niveles del mundo'
    },
    {
      img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1552587649/c124e135c76d7c26b0.jpg',
      cantidad: 'X1',
      isVerificado: false,
      precio: '$12.200',
      hora: '14:00',
      titulo: 'El mejor nivel de todos los niveles del mundo'
    }
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TiendaMascotasVentasPage');
  }

}
