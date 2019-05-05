import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { IntroduccionPage } from '../introduccion/introduccion';
import { MascotasReservasPage } from '../mascotas-reservas/mascotas-reservas';
import { MascotasProvider } from '../../../providers/mascotas/mascotas';

@IonicPage()
@Component({
  selector: 'page-mascotas-oferta',
  templateUrl: 'mascotas-oferta.html',
})
export class MascotasOfertaPage {

  cupon: any;
  tienda: any;

  reserva_OK: any;
  reserva_seleccionada: any;
  user: any;

  mostrarBotonPagar: boolean;

  cliente_esta_comprando = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private _mascota: MascotasProvider
  ) {
    this.mostrarBotonPagar = this.navParams.get('mostrarBotonPagar');
    this.cupon = this.navParams.get('cupon');
    this.tienda = this.navParams.get('tienda');
  }


  openReservas() {

    let modal = this.modalCtrl.create(MascotasReservasPage, {
      cuponID: this.cupon._id
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
    if (this.cupon.isReserva && this.reserva_seleccionada) {
      return;
    } else {
      this.openReservas();
    }
  }

  iniciarCompra() {

    this.cliente_esta_comprando = true;

    if (this.cupon.isReserva && this.reserva_seleccionada) {
      this.crearCompra();
    } else {
      this.openReservas();
    }
  }

  crearCompra() {
    const compra = {
      tipo: 'cupon',
      cupon: this.cupon,
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

    this._mascota.comprarCupon(this.cupon._id, compra)
      .then((data: any) => {
        if (data.ok) {
          console.log('Compra Exitosa');
        } else {
          console.log('Ups, una persona acaba de reservar tu hora..');
        }
      });
  }


}




