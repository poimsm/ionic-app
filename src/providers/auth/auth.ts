import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Platform } from 'ionic-angular';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { FirebaseMessaging } from '@ionic-native/firebase-messaging';


@Injectable()
export class AuthProvider {
  // apiURL = 'http://localhost:3000';
  apiURL = 'https://poimsm-server.herokuapp.com';

  authState = new BehaviorSubject({ isAuth: false, authData: {} });

  constructor(
    private firebaseMessaging: FirebaseMessaging,
    private platform: Platform,
    private storage: Storage,
    public http: HttpClient
  ) {
    platform.ready().then(() => {
      this.loadStorage();
    });
  }

  loginIn(email, password) {
    return new Promise((resolve, reject) => {
      this.signIn(email, password).then((res: any) => {
        if (res.ok) {
          this.saveStorage(res.token, res.user);
          resolve(true);
        } else {
          resolve(false);
        }
      })
    });
  }

  loginUp(name, email, password) {
    return new Promise((resolve, reject) => {
      this.signUp(name, email, password).then((res: any) => {
        this.saveStorage(res.token, res.user);
        resolve();
      })
    });
  }

  logout(token, user) {
    this.removeStorage();

    if (user.isDelivery) {
      this.unsubscribeToNotifications()
        .then(() => console.log('Usuario desubscrito'))
    }
    const authData = {};
    this.authState.next({ isAuth: false, authData });
  }

  isAuthenticated() {
    return this.authState.value;
  }

  saveStorage(token, user) {
    const authData = { user, token };
    if (this.platform.is("cordova")) {
      this.storage.set("authData", JSON.stringify(authData));
      this.authState.next({ isAuth: true, authData });

    } else {
      localStorage.setItem("authData", JSON.stringify(authData));
      this.authState.next({ isAuth: true, authData });
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
      this.storage.get('authData').then(res => {

        if (res) {
          const authData = { user: JSON.parse(res).user, token: JSON.parse(res).token };
          this.authState.next({ isAuth: true, authData });
        } else {
          const authData = {};
          this.authState.next({ isAuth: false, authData });
        }
      });
    } else {
      if (localStorage.getItem('authData')) {
        const res = localStorage.getItem('authData');

        const authData = { user: JSON.parse(res).user, token: JSON.parse(res).token };
        this.authState.next({ isAuth: true, authData });

      } else {
        const authData = {};
        this.authState.next({ isAuth: false, authData });
      }
    }
  }

  removeStorage() {
    if (this.platform.is("cordova")) {
      this.storage.remove("authData");
    } else {
      localStorage.removeItem("authData");
    }
  }

  signIn(email, password) {
    const url = `${this.apiURL}/users/signin`;
    const body = { email, password };
    return this.http.post(url, body).toPromise();
  }

  signUp(name, email, password) {
    const url = `${this.apiURL}/users/signup`;
    const body = { name, email, password };
    return this.http.post(url, body).toPromise();
  }

  checkEmail(email) {
    const url = `${this.apiURL}/users/check-email`;
    const body = { email };
    return this.http.post(url, body).toPromise();
  }

  getUser(token) {
    const url = `${this.apiURL}/users/me`;
    const headers = new HttpHeaders({
      Authorization: `JWT ${token}`
    });
    return this.http.get(url, { headers }).toPromise();
  }

  subscribeToNotifications() {
    return this.firebaseMessaging.subscribe("delivery");
  }

  unsubscribeToNotifications() {
    return this.firebaseMessaging.unsubscribe("delivery");
  }
}
