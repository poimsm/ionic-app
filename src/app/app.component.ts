import { Component, ViewChild } from "@angular/core";
import { Platform, MenuController, NavController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { AuthProvider } from "../providers/auth/auth";
import { HomePage } from "../pages/home/home";
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild("content")
  nav: NavController;

  user = {name: "",  img: ""};
  login = LoginPage;
  home = HomePage;

  rootPage: any;
  // rootPage: any = HomePage;
  constructor(
    private menuCtrl: MenuController,
    platform: Platform,
    statusBar: StatusBar,
    private _auth: AuthProvider,
    splashScreen: SplashScreen
  ) {
    _auth.loadStorage().then((data: any) => {
      
      if (data.isAuth) {
        this.rootPage = this.home;
        this.user = data.user;        
      } else {
        this.rootPage = this.login;
      }
    });
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(pagina) {
    this.rootPage = pagina;
    this.menuCtrl.close();
  }
  
  logout() {
    this._auth.logout();
    this.rootPage = this.login;
    this.menuCtrl.close();
  }
}
