import { Component } from "@angular/core";
import { IonicPage, App, NavController, NavParams } from "ionic-angular";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { HomePage } from "../../pages/home/home";
import { Platform } from "ionic-angular";
import { Facebook } from "@ionic-native/facebook";
import { AuthProvider } from "../../providers/auth/auth";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  rootPage: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private _auth: AuthProvider,
    private fb: Facebook,
    private platform: Platform,
    public appCtrl: App
  ) { }

  signInWithFacebook() {
    let that = this;
    if (this.platform.is("cordova")) {
      return this.fb.login(['email', 'public_profile']).then(res => {

        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential)
          .then(() => {
            this._auth.login(res.authResponse.accessToken)
              .then(() => that.navCtrl.setRoot(HomePage));
          })
      });

    } else {
      this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then((res: any) => {
          const access_token = res.credential.accessToken;
          this._auth.login(access_token)
            .then(() => that.navCtrl.setRoot(HomePage));
        });
    }
  }
}
