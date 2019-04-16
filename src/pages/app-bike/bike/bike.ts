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
  puertaEntregar: string;
  puertaRecoger: string;
  service: any;
  origen: any = {ok: false};
  destino: any = {ok: false};

  rapido = true;
  programar = false;


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
        if (data.tipo == 'recoger') {          
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

  onChangeRapido(event) {
    if (event.checked) {
      this.programar = false;
    } else {
      this.programar = true;
      this.navCtrl.push(BikeProgramarPage);
    }
  }

  onChangeProgramar(event) {
    if (event.checked) {
      this.rapido = false;
      this.navCtrl.push(BikeProgramarPage);
    } else {
      this.rapido = true;
    }
  }

}
