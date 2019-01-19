import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { NocturnoImagenPage } from '../nocturno-imagen/nocturno-imagen';

@IonicPage()
@Component({
  selector: 'page-nocturno-galeria',
  templateUrl: 'nocturno-galeria.html',
})
export class NocturnoGaleriaPage {

  galeria = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {
    this.galeria = this.navParams.get('galeria')
  }

  openModal(url) {
    const modal = this.modalCtrl.create(NocturnoImagenPage, { url });
    modal.present();
  }

}
