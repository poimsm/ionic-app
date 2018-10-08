import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Platform } from "ionic-angular";
import { Subject } from "rxjs/Subject";
import { AngularFirestore } from "angularfire2/firestore";

export interface User {
  name: string;
  email?: string;
  password?: string;
  userId: string;
  userImg: string;
  reputation: number;
  isStore: boolean;
  storeName: string;
  provider: string;
}
export interface AuthData {
  name: string;
  email?: string;
  password?: string;
  userId: string;
  userImg: string;
  reputation: number;
  isStore: boolean;
  storeName: string;
  provider: string;
}

@Injectable()
export class AuthProvider {
  authChange = new Subject<boolean>();
  authData: AuthData;
  user: User;

  constructor(
    private platform: Platform,
    private storage: Storage,
    private afs: AngularFirestore
  ) {}

  // ----------------------------------------------------
  //           STORAGE
  // ----------------------------------------------------
  saveStorage() {
    if (this.platform.is("cordova")) {
      this.storage.set("authData", JSON.stringify(this.authData));
    } else {
      localStorage.setItem("authData", JSON.stringify(this.authData));
    }
  }
  loadStorage() {
    return new Promise((resolve, reject) => {
      if (this.platform.is("cordova")) {
        this.storage.get("authData").then(data => {
          if (data) {
            this.authData = data;
            resolve(true);
          } else {
            resolve(false);
          }
        });
      } else {
        if (localStorage.getItem("authData")) {
          const retrievedData = localStorage.getItem("authData");
          this.authData = JSON.parse(retrievedData);
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  }
  removeStorage() {
    if (this.platform.is("cordova")) {
      this.storage.remove("authData");
    } else {
      localStorage.removeItem("authData");
    }
  }
  login(data) {
    this.authData = {
      name: data.name,
      userId: data.userId,
      userImg: data.userImg,
      provider: data.provider,
      reputation: 0,
      isStore: false,
      storeName: "None"
    };
    this.user = {
      name: data.name,
      userId: data.userId,
      userImg: data.userImg,
      provider: data.provider,
      reputation: 0,
      isStore: false,
      storeName: "None"
    };
    this.saveStorage();
    this.addUser();
    this.authChange.next(true);
  }
  logout() {
    this.authData = null;
    this.removeStorage();
    this.authChange.next(false);
  }
  // getUser() {
  //   return { ...this.authData };
  // }
  isAuth() {
    return this.authData != null;
  }
  // ----------------------------------------------------
  //           FIREBASE
  // ----------------------------------------------------
  getUser() {
    console.log(this.authData.userId);
    return this.afs
      .collection("usuarios", ref =>
        ref.where("userId", "==", this.authData.userId)
      )
      .valueChanges();
  }
  addUser() {
    this.afs.collection("usuarios").add(this.user);
  }
}
