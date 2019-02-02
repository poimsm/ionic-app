import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version';
import { Platform } from 'ionic-angular';


@Injectable()
export class PopupsProvider {

  categoriasEcommerce = {};
  categoriasOnce = {};
  mensajeHome = '';
  apiURL: string;

  constructor(
    private appVersion: AppVersion,
    private platform: Platform,
    public http: HttpClient
  ) {
    platform.ready().then(() => {
      this.loadServerParams();
    });
    this.setAPI();
  }

  setAPI() {
    if (this.platform.is('cordova')) {
      this.apiURL = 'https://poimsm-server.herokuapp.com';
    } else {
      // this.apiURL = 'https://poimsm-server.herokuapp.com';
      this.apiURL = 'http://localhost:3000';
    }
  }

  loadServerParams() {
    const url = `${this.apiURL}/popups/parametros`;
    this.http.get(url).toPromise()
      .then((data: any) => {
        this.categoriasEcommerce = data.categoriasEcommerce;
        this.categoriasOnce = data.categoriasOnce;
        this.mensajeHome = data.mensajeHome;
      });
  }

  async checkAppVersion(token) {
    if (this.platform.is('cordova')) {
      const version = await this.appVersion.getVersionNumber();

      const url = `${this.apiURL}/popups/app-version`;
      const headers = new HttpHeaders({
        Authorization: `JWT ${token}`
      });
      const body = { version };
      return this.http.post(url, body, { headers }).toPromise();
    } else {
      const version = '0.2.0';
      const url = `${this.apiURL}/popups/app-version`;
      const headers = new HttpHeaders({
        Authorization: `JWT ${token}`
      });
      const body = { version };
      return this.http.post(url, body, { headers }).toPromise();

    }
  }
}
