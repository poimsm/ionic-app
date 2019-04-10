import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MascotasOfertaPage } from '../mascotas-oferta/mascotas-oferta';
import { MascotasPaquetePage } from '../mascotas-paquete/mascotas-paquete';

@IonicPage()
@Component({
  selector: 'page-mascotas-content',
  templateUrl: 'mascotas-content.html',
})
export class MascotasContentPage {

  equipo = [
    {
      nombre: 'Eduardo',
      cargo: 'Veterinario',
      img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1553485595/dgfhjo.jpg'
    },
    {
      nombre: 'Camila',
      cargo: 'Estudiante',
      img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1553485595/ImageServlet.jpg'
    },
    {
      nombre: 'Daniela',
      cargo: 'Recepcionista',
      img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1553485595/depositphotos_136696658-stock-video-beauty-salon-receptionist-answering-clients.jpg'
    }
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openPromo(tipo) {
    if (tipo == 'oferta') {
      this.navCtrl.push(MascotasOfertaPage, { tipo: 'mascotas' });
    } else {
      this.navCtrl.push(MascotasPaquetePage, { tipo: 'mascotas' });
    }
  }

}