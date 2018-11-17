import { Component, ViewChild } from "@angular/core";
import { Platform, MenuController, NavController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Subscription } from "rxjs/Subscription";
import { AuthProvider } from "../providers/auth/auth";
import { HomePage } from "../pages/home/home";
import {
  AjustesPage,
  OutfitsPage,
  PerfilPage,
  LoginPage,
  PublicacionesPage,
  CuponesPage,
  NuevaTiendaPage,
  TiendaPage,
  BlogsPage,
  GuardadoPage,
  PedidosPage,
  MarketPage,
  NewProductPage,
  NewOutfitPage,
  NewBlogPage,
  RoomsPage,
  DeliveryPage,
  CestaPage,
  DirectionPage,
  NewServicePage,
  CuponPage,
  CabanaPage
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
  delivery = DeliveryPage;
  direction = DirectionPage;

  ajustes = AjustesPage;
  perfil = PerfilPage;
  login = LoginPage;

  cupon = CuponPage;
  cabana = CabanaPage;
  blogs = BlogsPage;
  outfits = OutfitsPage;
  rooms = RoomsPage;
  market = MarketPage;
  home = HomePage;

  publicaciones = PublicacionesPage;
  cupones = CuponesPage;
  tienda = TiendaPage;
  guardado = GuardadoPage;
  pedidos = PedidosPage;

  crearBlog = NewBlogPage;
  crearProducto = NewProductPage;
  crearServicio = NewServicePage;
  crearTienda = NuevaTiendaPage;
  crearOutfit = NewOutfitPage;

  // rootPage: any;
  rootPage: any = HomePage;
  constructor(
    private menuCtrl: MenuController,
    platform: Platform,
    statusBar: StatusBar,
    _auth: AuthProvider,
    splashScreen: SplashScreen
  ) {
    // _auth.loadStorage().then(isAuth => {
    //   if (isAuth) {
    //     this.rootPage = this.home;
    //   } else {
    //     this.rootPage = this.login;
    //   }
    // });
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  openPage(pagina) {
    this.rootPage = pagina;
    this.menuCtrl.close();
  }
  openMarket(category) {
    this.nav.push(this.market, {
      cat: category
    });
    this.menuCtrl.close();
  }
}
