import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { BikeMapaPage } from '../bike-mapa/bike-mapa';
import { BikeProgramarPage } from '../bike-programar/bike-programar';
import { BikeProvider } from '../../../providers/bike/bike';

declare var google: any;


@IonicPage()
@Component({
  selector: 'page-bike',
  templateUrl: 'bike.html',
})
export class BikePage {

  nota: string;
  telefono: string;
  nombre: string;
  puertaRecibe: string;
  puertaEnvia: string;
  enviaAdress: any;
  recibeAdress: any;
  service: any;
  origen: any = {ok: false};
  destino: any = {ok: false};


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _bike: BikeProvider,
    public modalCtrl: ModalController
  ) {
    this.service = new google.maps.DistanceMatrixService();
  }

  openMapa(tipo) {
    const modal = this.modalCtrl.create(BikeMapaPage, { tipo });
    modal.onDidDismiss(data => {
      if (data.position.ok) {
        if (data.tipo == 'envia') {          
          this.origen = data.position;
        } else {
          this.destino = data.position;
        }
        if (this.origen.ok && this.destino.ok) {
          this.calcularDistancia()
        }
      }
    });
    modal.present();
  }

  calcularDistancia() {
    this.service.getDistanceMatrix(
      {
        origins: [this.origen.address],
        destinations: [this.destino.address],
        travelMode: 'DRIVING',
      }, this.callback);
  }

  callback(response, status) {
    console.log('Distancee', response);

    console.log('Distancee2', response.rows[0].elements[0].distance.value);
  }

  openProgramar() {
    this.navCtrl.push(BikeProgramarPage);
  }

  onChange(event) {
    if (event.checked) {
      this.navCtrl.push(BikeProgramarPage);
    }
  }

}
