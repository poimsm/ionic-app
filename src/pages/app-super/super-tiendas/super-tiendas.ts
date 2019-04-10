import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuperCategoriasPage } from '../super-categorias/super-categorias';

@IonicPage()
@Component({
  selector: 'page-super-tiendas',
  templateUrl: 'super-tiendas.html',
})
export class SuperTiendasPage {

  supers = [
    {
      nombre: 'Supermercado miranda',
      envios: 'Envio $1000',
      comentarios: '18 comentarios',
      img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1554372080/super/2fa48820583179.562edb994b17d.png',
    },
    {
      nombre: 'Cada',
      envios: 'Envio $1200',
      comentarios: '37 comentarios',
      img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1554372080/super/brand.gif',
    },
    {
      nombre: 'Diprova',
      envios: 'Envio $1400',
      comentarios: '63 comentarios',
      img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1554372080/super/images.png',
    }
  ];

  petShops = [
    {
      nombre: 'HappyZooo',
      envios: 'Envio $1500',
      comentarios: '34 comentarios',
      img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1554372696/super/logo.png',
    },
    {
      nombre: 'None',
      envios: 'Envio $1200',
      comentarios: '22 comentarios',
      img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1554372696/super/5b9487c6b460d_thumbCard.jpg',
    },
    {
      nombre: 'PetLife',
      envios: 'Envio $900',
      comentarios: '14 comentarios',
      img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1554372696/super/logo-texto-oscuro-1.png',
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openCategorias() {
    this.navCtrl.push(SuperCategoriasPage);
  }

}
