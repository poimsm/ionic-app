import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TiendaMascotasAgendaConfigPage } from '../tienda-mascotas-agenda-config/tienda-mascotas-agenda-config';
import { AgendaProvider } from '../../../providers/agenda/agenda';


@IonicPage()
@Component({
  selector: 'page-tienda-mascotas-agenda',
  templateUrl: 'tienda-mascotas-agenda.html',
})
export class TiendaMascotasAgendaPage {

  tiendaID: string;
  dias = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _agenda: AgendaProvider,
    private modalCtrl: ModalController
  ) {
    this.tiendaID = this.navParams.get('tiendaID');
    this.obtenerDias();
  }

  openModalConfig() {
    let configuraciones = this.modalCtrl.create(TiendaMascotasAgendaConfigPage);
    configuraciones.onDidDismiss(data => {
      console.log(data);      
    });
    configuraciones.present();
  }

  obtenerDias() {
    this._agenda.construirDias(this.tiendaID)
      .then((dias: any) => {
        this.dias = dias;
        this.dias[1].isActive = true;
      });
  }

  activarDia(index) {

    this.dias.forEach(dia => {
      dia.isActive = false;
    });

    this.dias[index].isActive = !this.dias[index].isActive;
  }

  activarHora(indexDia, indexHora, isActual) {

    if (!isActual) {
      return
    }

    this.dias[indexDia].horas[indexHora].isActive = !this.dias[indexDia].horas[indexHora].isActive;
  }


  ionViewWillLeave() {
    console.log('se')
    // this._agenda.actualizarDias(this.dias);
  }


}
