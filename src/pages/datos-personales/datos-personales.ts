import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-datos-personales',
  templateUrl: 'datos-personales.html',
})
export class DatosPersonalesPage {

  telefono: number;
  mensaje: string;
  direccion = '';
  isenabled = false;

  constructor(
    private alertCtrl: AlertController,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: '¿Desea continuar?',
      subTitle: '¡Esta a punto de completar el pedido!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            const datos: any = {
              ok: true,
              telefono: this.telefono,
              direccion: this.direccion
            };
            this.viewCtrl.dismiss(datos);

          }
        }
      ]
    });
    alert.present();
  }

  close(key) {

    const datos: any = {
      ok: false
    }

    this.viewCtrl.dismiss(datos);
  }

  close2(key) {

    const datos: any = {
      ok: true,
      telefono: this.telefono,
      direccion: this.direccion
    }

    if (this.mensaje) {
      datos.mensaje = this.mensaje;
    }
    if (key == "x") {
      datos.ok = false
    }

    this.viewCtrl.dismiss(datos);
  }


}
