import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';


@Injectable()
export class LocalizacionProvider {
  ciudad: string;
  presentarAlert = true;

  constructor(public http: HttpClient, public alertController: AlertController) {
    console.log('Hello LocalizacionProvider Provider');
  }

  cambiarCiudad(ciudad) {
    this.ciudad = ciudad;
  }

  showRadio() {
    let alert = this.alertController.create();
    alert.setTitle('Seleccione una ciudad');

    if (this.ciudad == 'VALDIVIA') {
      alert.addInput({
        type: 'radio',
        label: 'Valdivia',
        value: 'VALDIVIA',
        checked: true
      });
    } else {
      alert.addInput({
        type: 'radio',
        label: 'Valdivia',
        value: 'VALDIVIA',
        checked: false
      });
    }

    if (this.ciudad == 'OSORNO') {
      alert.addInput({
        type: 'radio',
        label: 'Osorno',
        value: 'OSORNO',
        checked: true
      });
    } else {
      alert.addInput({
        type: 'radio',
        label: 'Osorno',
        value: 'OSORNO',
        checked: false
      });
    }

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.ciudad = data;
      }
    });
    alert.present();
  }


}
