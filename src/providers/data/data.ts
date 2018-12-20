import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class DataProvider {
  apiURL = "http://localhost:3000";
  // apiURL = "http://192.168.1.8:3000";
  // apiURL = "https://poimsm-server.herokuapp.com";

  constructor(
    public toastCtrl: ToastController,
    public http: HttpClient
  ) {}

  addCompra(token, body) {
    const url = `${this.apiURL}/compras/compras-crear`;
    const headers = new HttpHeaders({
      Authorization: `JWT ${token}`
    });
    
    return this.http.post(url, body, { headers }).toPromise();
  }

  addContacto(token, body) {
    const url = `${this.apiURL}/compras/compras-guardar-contacto`;
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

  misCompras(token, id) {
    const url = `${this.apiURL}/compras/compras-por-usuario/${id}`;

    const headers = new HttpHeaders({
      Authorization: `JWT ${token}`
    });

    return this.http.get(url, { headers }).toPromise();
  }

}
