import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Platform } from "ionic-angular";
import { Subject } from "rxjs/Subject";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class AuthProvider {
  apiURL = "http://localhost:3000";
  // apiURL = "http://192.168.1.8:3000";
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

  async updateUserStorage(token) {
    try {
      const resUser: any = await this.getUser(token);
      this.saveStorage(resUser.user, token);
    } catch (error) {
      console.log("Error", error);
    }
  }

  loadStorage() {
    return new Promise((resolve, reject) => {
      if (this.platform.is("cordova")) {
        this.storage.get("credentials").then(data => {
          
          if (data) {
            const retrieved = {
              isAuth: true,
              user: data.user,
              token: data.token
            }
            resolve(retrieved);
          } else {
            resolve({isAuth: false});
          }
        });
      } else {
        if (localStorage.getItem("credentials")) {
          const retrieved = localStorage.getItem("credentials");

          const data = {
            isAuth: true,
            user: JSON.parse(retrieved).user,
            token: JSON.parse(retrieved).token
          }          
          resolve(data);
        } else {
          resolve({isAuth: false});
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
