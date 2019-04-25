import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { IntroduccionPage } from '../introduccion/introduccion';
import { ConfigProvider } from '../../../providers/config/config';
import { MaquetaProvider } from '../../../providers/maqueta/maqueta';
import { MascotasReservasPage } from '../mascotas-reservas/mascotas-reservas';
import { MascotasProvider } from '../../../providers/mascotas/mascotas';

@IonicPage()
@Component({
  selector: 'page-mascotas-oferta',
  templateUrl: 'mascotas-oferta.html',
})
export class MascotasOfertaPage {

  tipo: string;
  from: string;
  data: any;
  payload: object;

  reserva_OK: any;
  reserva_seleccionada: any;
  user: any;

  cliente_esta_comprando = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _config: ConfigProvider,
    public _maqueta: MaquetaProvider,
    private modalCtrl: ModalController,
    private _mascota: MascotasProvider
  ) {
    this.tipo = this.navParams.get('tipo');
    this.payload = this.navParams.get('payload');
    this.from = this.navParams.get('from');

    this.setData();
  }

  setData() {
    if (this.tipo === 'mascotas' && this._config.MAQUETA) {
      this.data = this._maqueta.crearCuponMascotas();
    }
    if (this.from === 'tienda-mascotas') {
      this.data = this.payload;
    }
  }

  openReservas() {

    let modal = this.modalCtrl.create(MascotasReservasPage, {
      cuponID: this.data._id,
      semana: this.data.semana,
      seleccionPrevia: this.reserva_seleccionada
    });

    modal.onDidDismiss(data => {
      if (data.ok) {
        this.reserva_seleccionada = data.selection;
        if (this.cliente_esta_comprando) {
          // this.navCtrl.push()
          this.crearCompra();
        }
      }
    });

    modal.present();
  }


  openIntro() {
    this.navCtrl.push(IntroduccionPage);
  }

  checkear() {
    if (this.data.isReserva && this.reserva_seleccionada) {
      return;
    } else {
      this.openReservas();
    }
  }

  iniciarCompra() {

    this.cliente_esta_comprando = true;

    if (this.data.isReserva && this.reserva_seleccionada) {
      this.crearCompra();
    } else {
      this.openReservas();
    }
  }

  crearCompra() {
    const compra = {
      tipo: 'cupon',
      cupon: this.data,
      cliente: {
        id: this.user._id,
        nombre: this.user.name,
        email: this.user.local.email,
        reserva: {
          dia: this.reserva_seleccionada.dia,
          num: this.reserva_seleccionada.num,
          hora: this.reserva_seleccionada.hora.hora,
          index: this.reserva_seleccionada.hora.index
        }
      }
    }

    this._mascota.comprarCupon(this.data._id, compra)
      .then((data: any) => {
        if (data.ok) {
          console.log('Compra Exitosa');
        } else {
          console.log('Ups, una persona justo acaba de reservar tu hora..');
        }
      });
  }


}




