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

  add(token, body, key) {
    const url = `${this.apiURL}/apps/${key}`;
    const headers = new HttpHeaders({
      Authorization: `JWT ${token}`
    });
    
    return this.http.post(url, body, { headers }).toPromise();
  }

  get(token, key, skip, limit, category) {
    const url = `${this.apiURL}/apps/${key}`;

    // let headers = new HttpHeaders();
    // headers.append('Authorization', `JWT ${token}`)
    const headers = new HttpHeaders({
      Authorization: `JWT ${token}`
    });
    

    let params = new HttpParams();
    params = params.append('skip', skip);
    params = params.append('limit', limit);
    params = params.append('category', category);

    const options = { params, headers };

    return this.http.get(url, options).toPromise();
  }
}
