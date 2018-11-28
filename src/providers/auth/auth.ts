import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Platform } from "ionic-angular";
import { Subject } from "rxjs/Subject";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class AuthProvider {
  apiURL = "http://localhost:3000";
  // apiURL = "https://poimsm-server.herokuapp.com";
  user = {};
  token = "";
  authData = {};

  authState = new Subject<boolean>();

  constructor(
    private platform: Platform,
    private storage: Storage,
    public http: HttpClient
  ) {}

  async login(accessToken) {
    try {
      const resToken: any = await this.getToken(accessToken);
      const resUser: any = await this.getUser(resToken.token);
      console.log(resUser.user);
      
      this.saveStorage(resUser.user, resToken.token);
      this.authState.next(true);
    } catch (error) {
      console.log("Error", error);
    }
  }

  logout() {
    this.token = null;
    this.user = null;
    this.removeStorage();
    this.authState.next(false);
  }

  saveStorage(user, token) {
    const credentials = { user, token };
    if (this.platform.is("cordova")) {
      this.storage.set("credentials", JSON.stringify(credentials));
    } else {
      localStorage.setItem("credentials", JSON.stringify(credentials));
    }
  }

  loadStorage() {
    return new Promise((resolve, reject) => {
      if (this.platform.is("cordova")) {
        this.storage.get("credentials").then(data => {
          if (data) {
            this.user = data.user;
            this.token = data.token;
            resolve(true);
          } else {
            resolve(false);
          }
        });
      } else {
        if (localStorage.getItem("credentials")) {
          const retrievedData = localStorage.getItem("credentials");
          this.user = JSON.parse(retrievedData).user;
          this.token = JSON.parse(retrievedData).token;
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
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
