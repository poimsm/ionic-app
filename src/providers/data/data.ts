import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { Platform } from "ionic-angular";

@Injectable()
export class DataProvider {
  apiURL = "http://localhost:3000";
  // apiURL = "http://192.168.1.8:3000";
  // apiURL = "https://poimsm-server.herokuapp.com";

  constructor(
    private platform: Platform,
    private storage: Storage,
    public toastCtrl: ToastController,
    public http: HttpClient
  ) {}

  addStorePost(token, body, path) {
    const url = `${this.apiURL}/apps/${path}`;
    const headers = new HttpHeaders({
      Authorization: `JWT ${token}`
    });
    
    return this.http.post(url, body, { headers }).toPromise();
  }

  storeApply(token, body) {
    const url = `${this.apiURL}/admin/stores-apply-create`;

    const headers = new HttpHeaders({
      Authorization: `JWT ${token}`
    });  
    return this.http.post(url, body, { headers }).toPromise();
  }

  deliveryApply(token, body) {
    const url = `${this.apiURL}/admin/delivery-apply-create`;

    const headers = new HttpHeaders({
      Authorization: `JWT ${token}`
    });  
    return this.http.post(url, body, { headers }).toPromise();
  }

  getAll(token, skip, limit, category, path) {

    let url = `${this.apiURL}/${path}`;
    url = url + `?limit=${limit}&skip=${skip}`;

    const headers = new HttpHeaders({
      Authorization: `JWT ${token}`
    });

    if (category) {
      url = url + `&category=${category}`;
    }
    return this.http.get(url, {headers}).toPromise();
  }

  getOne(token, id, path) {

    let url = `${this.apiURL}/${path}/${id}`;

    const headers = new HttpHeaders({
      Authorization: `JWT ${token}`
    });
    
    return this.http.get(url, {headers}).toPromise();
  }

  buyOneCoupon(token, body) {
    const url = `${this.apiURL}/apps/coupons-buy`;

    const headers = new HttpHeaders({
      Authorization: `JWT ${token}`
    });  
    return this.http.post(url, body, { headers }).toPromise();
  }

  myCoupons(token) {
    const url = `${this.apiURL}/apps/coupons-me`;

    const headers = new HttpHeaders({
      Authorization: `JWT ${token}`
    });  
    return this.http.get(url, { headers }).toPromise();
  }

}
