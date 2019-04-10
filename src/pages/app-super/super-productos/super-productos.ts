import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-super-productos',
  templateUrl: 'super-productos.html',
})
export class SuperProductosPage {

  productos = [
    {
      titulo: 'Bebidas, Pack 3',
      img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1554369153/super/639-bebida-ccu-pack-3.jpg',
      precio: '$2.290'
    },
    {
      titulo: 'Bebida Nordic Ginger Ale, 1,5 L',
      img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1554370715/super/000000000000023122-UN.jpg',
      precio: '$1.590'
    },
    {
      titulo: 'Bebidas antiox y détox',
      img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1554370715/super/00118658600822____2__600x600.jpg',
      precio: '$1.200'
    },
    {
      titulo: 'Six Pack Coca Cola Normal',
      img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1554370892/super/779942-0000-001.webp',
      precio: '$2.200'
    },
    {
      titulo: 'Coca cola 2 L',
      img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1554371197/super/funda_coca_cola_225_litros_-_copia.jpg',
      precio: '$1.900'
    },
    {
      titulo: 'Bilz 1,5 L',
      img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1554371197/super/bb15_c_-_copia.png',
      precio: '$1.590'
    },
    {
      titulo: 'Crush 1,5 L',
      img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1554371197/super/images_-_copia.jpg',
      precio: '$1.590'
    },
    {
      titulo: 'Kem 1,5 L',
      img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1554371455/super/BEBIDA-DESECHABLE-KEM-PIN%CC%83A-1.5L-600x600.jpg',
      precio: '$1.590'
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  
}
