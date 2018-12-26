import { Component, ViewChild } from "@angular/core";
import { Platform, MenuController, NavController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { AuthProvider } from "../providers/auth/auth";
import { HomePage } from "../pages/home/home";
import { LoginPage } from '../pages/login/login';
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild("content")
  nav: NavController;

  login = LoginPage;
  home = HomePage;

  state: boolean;

  rootPage: any;
  // rootPage: any = HomePage;
  constructor(
    private afAuth: AngularFireAuth,
    private menuCtrl: MenuController,
    platform: Platform,
    statusBar: StatusBar,
    private _auth: AuthProvider,
    splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this._auth.authState.subscribe(state => {
        this.state = state;
        if (state) {
          this.rootPage = this.home;
        } else {
          this.rootPage = this.login;
        }
      });
    });
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this._auth.logout();
      this.nav.push(this.login);
      this.menuCtrl.close();
    });
  }
}
