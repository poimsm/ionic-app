import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { Platform } from "ionic-angular";
import { Facebook } from "@ionic-native/facebook";

export interface Credenciales {
  nombre?: string;
  email?: string;
  imagen?: string;
  uid?: string;
  provider?: string;
}

@Injectable()
export class UserProvider {
  usuario: Credenciales = {};
  constructor(
    private afAuth: AngularFireAuth,
    private fb: Facebook,
    private platform: Platform
  ) {}

  cargarUsuario(nombre, email, imagen, uid, provider) {
    (this.usuario.nombre = nombre),
      (this.usuario.email = email),
      (this.usuario.imagen = imagen),
      (this.usuario.uid = uid),
      (this.usuario.provider = provider);
  }
  signInWithFacebook() {
    return new Promise((resolve, reject) => {
      if (this.platform.is("cordova")) {
        this.fb.login(["email", "public_profile"]).then(res => {
          const facebookCredential = firebase.auth.FacebookAuthProvider.credential(
            res.authResponse.accessToken
          );
          firebase
            .auth()
            .signInWithCredential(facebookCredential)
            .then(data => resolve(true));
        });
      } else {
        this.afAuth.auth
          .signInWithPopup(new firebase.auth.FacebookAuthProvider())
          .then(data => resolve(true));
      }
    });
  }
}
