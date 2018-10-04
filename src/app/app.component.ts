import { Component } from "@angular/core";
import { Platform, MenuController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Subscription } from "rxjs/Subscription";
import { AuthProvider } from "../providers/auth/auth";
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
  RoomsPage
} from "../pages/index.pages";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  outfitCategories = [
    "Moda",
    "Blusa",
    "Bebé y niños",
    "Pantalones",
    "Carteras y bolsos",
    "Zapatos"
  ];

  homeCategories = [
    "Ropa de cama",
    "Ropa de cama infantil",
    "Dormitorio",
    "Cosina",
    "Living",
    "Baño"
  ];

  isAuth = true;
  isMarket = false;
  authSubscription: Subscription;

  ajustes = AjustesPage;
  perfil = PerfilPage;
  login = LoginPage;

  blogs = BlogsPage;
  outfits = OutfitsPage;
  rooms = RoomsPage;
  market = MarketPage;

  publicaciones = PublicacionesPage;
  cupones = CuponesPage;
  tienda = TiendaPage;
  guardado = GuardadoPage;
  pedidos = PedidosPage;

  crearBlog = NewBlogPage;
  crearProducto = NewProductPage;
  crearTienda = NuevaTiendaPage;
  crearOutfit = NewOutfitPage;

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
        this.rootPage = this.outfits;
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
  menuNav(direction) {
    this.isMarket = true;
  }
  // ionViewWillLeave() {
  //   this.authSubscription.unsubscribe();
  // }
}
