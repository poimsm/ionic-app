import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PaqueteExpPage } from '../paquete-exp/paquete-exp';
import { OfertaExpPage } from '../oferta-exp/oferta-exp';


@IonicPage()
@Component({
  selector: 'page-mascota-content-exp',
  templateUrl: 'mascota-content-exp.html',
})
export class MascotaContentExpPage {

  showBeneficio = false;

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
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openPaquete() {
    this.navCtrl.push(PaqueteExpPage, { tipo: 'mascotas' });
  }

  openCupon() {
    this.navCtrl.push(OfertaExpPage, { tipo: 'mascotas' });
  }


}
