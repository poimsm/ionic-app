import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { Platform } from "ionic-angular";

@Injectable()
export class DataProvider {
  apiURL = "http://localhost:3000";
  // apiURL = "https://poimsm-server.herokuapp.com";

  constructor(
    private platform: Platform,
    private storage: Storage,
    public toastCtrl: ToastController,
    public http: HttpClient
  ) {}

  add(token, body, key) {
    const url = `${this.apiURL}/apps/${key}`;
    const headers = new HttpHeaders({
      Authorization: `JWT ${token}`
    });
    return this.http.post(url, body, { headers }).toPromise();
  }
}
