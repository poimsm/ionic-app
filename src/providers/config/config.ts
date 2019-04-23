import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class ConfigProvider {
  apiURL: string;

  // -------  SET HERE  -------

  ENTORNO = "dev";

  MAQUETA = true;

  constructor(public http: HttpClient) {
    this.setAPI();
  }

  setAPI() {
    if (this.ENTORNO == "dev") {
      // ------------------------------------
      //        LOCAL
      // ------------------------------------

      this.apiURL = "http://localhost:3000";

      // ------------------------------------
      //        SERVIDOR DE TESTING
      // ------------------------------------

      // this.apiURL = 'http://178.128.155.52:3000';
    }

    if (this.ENTORNO == "prod") {
      this.apiURL = "http://joopiterweb.com:3000";
    }
  }
}
