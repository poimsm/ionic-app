import { Component, ViewChild } from "@angular/core";
import { Platform, MenuController, NavController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Subscription } from "rxjs/Subscription";
import { AuthProvider } from "../providers/auth/auth";
import { HomePage } from "../pages/home/home";
import {
  PerfilPage,
  LoginPage,
  PublicacionesPage,
  TiendaPage,
  PedidosPage,
  CestaPage,
  PostPage,
  CuponPage,
  CabanaPage,
  ShopperApplyPage,
  StoreApplyPage,
  OrdersPage
} from "../pages/index.pages";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild("content")
  nav: NavController;

  isAuth = true;
  isMarket = false;
  authSubscription: Subscription;

  cesta = CestaPage;

  perfil = PerfilPage;
  login = LoginPage;

  cupon = CuponPage;
  cabana = CabanaPage;
  home = HomePage;

  publicaciones = PublicacionesPage;
  tienda = TiendaPage;
  pedidos = PedidosPage;

  shopperApply = ShopperApplyPage;
  storeApply = StoreApplyPage;

  orders = OrdersPage;

  crearPost = PostPage;

  rootPage: any;
  // rootPage: any = HomePage;
  constructor(
    private menuCtrl: MenuController,
    platform: Platform,
    statusBar: StatusBar,
    _auth: AuthProvider,
    splashScreen: SplashScreen
  ) {
    _auth.loadStorage().then(isAuth => {
      if (isAuth) {
        this.rootPage = this.home;
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
}
