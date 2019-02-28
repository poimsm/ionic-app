import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';


@Injectable()
export class ConfigProvider {

  apiURL: string;

  constructor(
    public http: HttpClient,
    private platform: Platform
    ) {
    this.setAPI();
    }

  setAPI() {
    if (this.platform.is('cordova')) {
      // ------------------------------------
      //        PRODUCCION
      // ------------------------------------

      this.apiURL = 'http://joopiterweb.com:3000';

      // ------------------------------------
      //        TESTING
      // ------------------------------------

      // this.apiURL = 'http://178.128.155.52:3000';

    } else {

      
      // ------------------------------------
      //        LOCAL
      // ------------------------------------

      // this.apiURL = 'http://178.128.155.52:3000';
      this.apiURL = 'http://joopiterweb.com:3000';
      // this.apiURL = 'http://localhost:3000';
    }
  }

}
