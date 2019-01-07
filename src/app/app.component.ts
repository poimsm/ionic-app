import { Component, ViewChild } from "@angular/core";
import { Platform, MenuController, NavController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { AuthProvider } from "../providers/auth/auth";
import { HomePage } from "../pages/home/home";
import { LoginPage } from '../pages/login/login';
import { AngularFireAuth } from "angularfire2/auth";
import { UsuarioPage } from '../pages/usuario/usuario';
import { PopupsProvider } from '../providers/popups/popups';
import { UpgradePage } from '../pages/upgrade/upgrade';

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild("content")
  nav: NavController;

  login = LoginPage;
  home = HomePage;
  usuario = UsuarioPage;
  upgrade = UpgradePage;

  state: boolean;
  user: any = {};
  token: string;
  isImg = false;

  rootPage: any;
  // rootPage: any = HomePage;
  constructor(
    private afAuth: AngularFireAuth,
    private menuCtrl: MenuController,
    platform: Platform,
    statusBar: StatusBar,
    private _auth: AuthProvider,
    private _popups: PopupsProvider,
    splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this._auth.authState.subscribe((data: any) => {
        if (data.isAuth) {
          this.user = data.authData.user;
          this.token = data.authData.token;

          this._popups.checkAppVersion(this.token)
            .then((res: any) => {

              if (res.forceUpgrade) {
                this.rootPage = this.upgrade;
              } else {
                this.rootPage = this.home;
                if (this.user.isDelivery) {
                  this._auth.subscribeToNotifications()
                    .then(() => console.log('Usuario subscrito'));
                }
              }
            });

        } else {
          this.rootPage = this.login;
        }
        this.state = data.isAuth;
      });
    });
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this._auth.logout(this.token, this.user);
      this.nav.push(this.login);
      this.menuCtrl.close();
    });
  }

  openPage(pagina) {
    this.nav.push(pagina);
    this.menuCtrl.close();
  }
}
