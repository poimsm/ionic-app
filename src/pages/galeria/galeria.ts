import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { GaleriaImagenPage } from '../galeria-imagen/galeria-imagen';


@IonicPage()
@Component({
  selector: 'page-galeria',
  templateUrl: 'galeria.html',
})
export class GaleriaPage {

  galeria = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {
    this.galeria = this.navParams.get('galeria')
  }

  openModal(url) {
    const modal = this.modalCtrl.create(GaleriaImagenPage, { url });
    modal.present();
  }

}