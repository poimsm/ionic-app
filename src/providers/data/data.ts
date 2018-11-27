import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { Platform } from "ionic-angular";

@Injectable()
export class DataProvider {
  apiURL = "https://poimsm-server.herokuapp.com";

  constructor(
    private platform: Platform,
    private storage: Storage,
    public toastCtrl: ToastController,
    public http: HttpClient
  ) {}

  addCoupon(token, body) {
    const url = `${this.apiURL}/apps/coupons`;
    const headers = new HttpHeaders({
      Authorization: `JWT ${token}`
    });
    return this.http.post(url, body, { headers }).toPromise();
  }
}
