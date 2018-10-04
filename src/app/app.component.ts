import { Component } from "@angular/core";
import { Platform, MenuController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Subscription } from "rxjs/Subscription";
import { AuthProvider } from "../providers/auth/auth";
import { BedroomPage } from "../pages/bedroom/bedroom";
import {
  AjustesPage,
  HomePage,
  PerfilPage,
  LoginPage,
  OutfitPage,
  SubirTresPage,
  PublicacionesPage,
  CuponesPage,
  NuevaTiendaPage,
  TiendaPage,
  NuevoBlogPage,
  BlogsPage,
  GuardadoPage,
  PedidosPage,
  MarketPage
} from "../pages/index.pages";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  isAuth = true;
  isMarket = false;
  authSubscription: Subscription;

  ajustes = AjustesPage;
  perfil = PerfilPage;
  login = LoginPage;

  blogs = BlogsPage;
  home = HomePage;
  bedroom = BedroomPage;
  market = MarketPage;

  publicaciones = PublicacionesPage;
  cupones = CuponesPage;
  tienda = TiendaPage;
  guardado = GuardadoPage;
  pedidos = PedidosPage;

  crearBlog = NuevoBlogPage;
  crearProducto = SubirTresPage;
  crearTienda = NuevaTiendaPage;
  crearOutfit = OutfitPage;

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
    if (pagina !== this.market) {
      this.rootPage = pagina;
      this.menuCtrl.close();
    } else {
      this.isMarket = true;
    }
  }
  // ionViewWillLeave() {
  //   this.authSubscription.unsubscribe();
  // }
}
