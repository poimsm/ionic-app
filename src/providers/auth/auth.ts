import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Platform } from 'ionic-angular';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class AuthProvider {
  // apiURL = "http://localhost:3000";
  apiURL = "https://poimsm-server.herokuapp.com";

  authState = new BehaviorSubject(false);
  credentials = {};

  constructor(
    private platform: Platform,
    private storage: Storage,
    public http: HttpClient
  ) {
    platform.ready().then(() => {
      this.loadStorage();
    });
  }

  login(accessToken) {
    return new Promise((resolve, reject) => {
      this.getToken(accessToken).then((resToken: any) => {
        this.getUser(resToken.token).then((resUser: any) => {
          this.saveStorage(resUser.user, resToken.token);
          resolve();
        })
      })
    });
  }

  logout() {
    this.credentials = null;
    this.removeStorage();
    this.authState.next(false);
  }

  isAuthenticated() {
    return this.authState.value;
  }

  saveStorage(user, token) {
    this.credentials = { user, token };
    if (this.platform.is("cordova")) {
      this.storage.set("credentials", JSON.stringify(this.credentials));
      this.authState.next(true);
    } else {
      localStorage.setItem("credentials", JSON.stringify(this.credentials));
      this.authState.next(true);
    }
  }

  async updateUserStorage(token) {
    try {
      const resUser: any = await this.getUser(token);
      this.saveStorage(resUser.user, token);
    } catch (error) {
      console.log("Error", error);
    }
  }

  loadStorage() {
    if (this.platform.is('cordova')) {
      this.storage.get('credentials').then(res => {

        if (res) {
          this.credentials = { user: res.user, token: res.token };
          this.authState.next(true);
        } else {
          this.authState.next(false);
        }
      });
    } else {
      if (localStorage.getItem('credentials')) {
        const res = localStorage.getItem('credentials');

        this.credentials = { user: JSON.parse(res).user, token: JSON.parse(res).token };
        this.authState.next(true);
      } else {
        this.authState.next(false);
      }
    }
  }

  removeStorage() {
    if (this.platform.is("cordova")) {
      this.storage.remove("credendials");
    } else {
      localStorage.removeItem("credentials");
    }
  }

  getToken(accessToken) {
    const url = `${this.apiURL}/users/oauth/facebook`;
    const body = { access_token: accessToken };
    return this.http.post(url, body).toPromise();
  }

  getUser(token) {
    const url = `${this.apiURL}/users/me`;
    const headers = new HttpHeaders({
      Authorization: `JWT ${token}`
    });
    return this.http.get(url, { headers }).toPromise();
  }
}
