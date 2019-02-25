import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, Platform } from 'ionic-angular';


@Injectable()
export class LocalizacionProvider {
  apiURL: string;
  ciudad = 'Valdivia';
  ciudades = [];
  presentarAlert = true;

  constructor(
    public http: HttpClient,
    public alertController: AlertController,
    private platform: Platform
  ) { }

  setAPI() {
    if (this.platform.is('cordova')) {
      this.apiURL = 'http://joopiterweb.com:3000';
    } else {
      this.apiURL = 'http://localhost:3000';
    }
  }

  loadCiudades() {

    this.setAPI();

    return new Promise((resolve, reject) => {
      const url = `${this.apiURL}/popups/parametros`;
      this.http.get(url).toPromise()
        .then((data: any) => {
          this.ciudades = data.ciudades;
          resolve();
        });
    });
  }

  cambiarCiudad(ciudad) {
    this.ciudad = ciudad;
  }

  seleccionarCiudad() {

    return new Promise((resolve, reject) => {

      if (this.ciudades.length == 0) {
        this.loadCiudades()
          .then(() => {
            let alert = this.alertController.create();
            alert.setTitle('Ubicación');
            alert.setSubTitle('Seleccione una ciudad');

            this.ciudades.forEach(ciudad => {

              if (this.ciudad == ciudad) {
                alert.addInput({
                  type: 'radio',
                  label: ciudad,
                  value: ciudad,
                  checked: true
                });
              } else {
                alert.addInput({
                  type: 'radio',
                  label: ciudad,
                  value: ciudad,
                  checked: false
                });
              }
            });

            alert.addButton({
              text: 'Omitir',
              role: 'cancel',
              handler: () => {
                resolve({ ok: false })
              }
            });

            alert.addButton({
              text: 'OK',
              handler: data => {
                this.ciudad = data;
                resolve({ ok: true, ciudad: data })
              }
            });
            alert.present();
          });
      } else {

        let alert = this.alertController.create();
        alert.setTitle('Ubicación');
        alert.setSubTitle('Seleccione una ciudad');

        this.ciudades.forEach(ciudad => {

          if (this.ciudad == ciudad) {
            alert.addInput({
              type: 'radio',
              label: ciudad,
              value: ciudad,
              checked: true
            });
          } else {
            alert.addInput({
              type: 'radio',
              label: ciudad,
              value: ciudad,
              checked: false
            });
          }
        });

        alert.addButton({
          text: 'Omitir',
          role: 'cancel',
          handler: () => {
            resolve({ ok: false })
          }
        });

        alert.addButton({
          text: 'OK',
          handler: data => {
            this.ciudad = data;
            resolve({ ok: true, ciudad: data })
          }
        });
        alert.present();
      }
    });
  }

}
