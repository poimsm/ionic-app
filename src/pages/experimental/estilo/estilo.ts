import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SeccionesProvider } from '../../../providers/secciones/secciones';
import { EstiloContentPage } from '../estilo-content/estilo-content';


@IonicPage()
@Component({
  selector: 'page-estilo',
  templateUrl: 'estilo.html',
})
export class EstiloPage {

  popular = [
    {
      img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1556475563/maqueta/gritnglory-profile_bqLqBwNZdg.jpg',
      text: 'Giftcard para Tatuaje',
      precio: '$30.000'
    },
    {
      img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1556489096/maqueta/il_570xN.1038840451_o33g.jpg',
      text: 'Uñas esculpidas de porcelana, gel o acrílicas',
      precio: '$14.000'
    },
    {
      img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1556489457/maqueta/13616bc5531b8c023806f2f50ff2bf74156160.jpg',
      text: 'Corte de cabello + Brushing',
      precio: '$9.900'
    },
    {
      img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1556489967/maqueta/61ebffe4bb84ebf0ee682ced1c257cdc330320.jpg',
      text: 'Uñas esculpidas de porcelana, gel o acrílicas',
      precio: '$10.000'
    }
  ]
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _secciones: SeccionesProvider
    ) {
      _secciones.cambiarTipo('estilo');
  }

  openContent() {
    this.navCtrl.push(EstiloContentPage);
  }

}
