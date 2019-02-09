import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, Platform } from 'ionic-angular';


@Injectable()
export class LocalizacionProvider {
  apiURL: string;
  ciudad: string;
  ciudades = [];
  presentarAlert = true;

  constructor(
    public http: HttpClient,
    public alertController: AlertController,
    private platform: Platform
  ) {
    platform.ready().then(() => {
      this.loadCiudades();
    });
    this.setAPI();
  }

  setAPI() {
    if (this.platform.is('cordova')) {
      this.apiURL = 'https://poimsm-server.herokuapp.com';
    } else {
      this.apiURL = 'http://localhost:3000';
    }
  }

  loadCiudades() {
    const url = `${this.apiURL}/popups/parametros`;
    this.http.get(url).toPromise()
      .then((data: any) => {
        console.log(data);

        for (let i = 0; i < Object.keys(data.ciudades).length; i++) {
          this.ciudades.push(data.ciudades[i]);
        }
      });
    console.log('pasooo');

    console.log(this.ciudades);

  }

  cambiarCiudad(ciudad) {
    this.ciudad = ciudad;
  }

  showRadio() {
    let alert = this.alertController.create();
    alert.setTitle('Localización');
    alert.setSubTitle('Seleccione una ciudad');

    this.ciudades.forEach(data => {

      if (this.ciudad == data.value) {
        alert.addInput({
          type: 'radio',
          label: data.ciudad,
          value: data.value,
          checked: true
        });
      } else {
        alert.addInput({
          type: 'radio',
          label: data.ciudad,
          value: data.value,
          checked: false
        });
      }
    });

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
