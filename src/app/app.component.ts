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
  ComboPage,
  CuponPage,
  CabanaPage
} from "../pages/index.pages";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  outfitCategories = [
    "Pan",
    "Pan gourmet",
    "Desayunos",
    "Cafetería",
    "Carteras y bolsos",
    "Zapatos"
  ];
  outfitToQuery = [
    "moda",
    "blusa",
    "bebe_ninos",
    "pantalones",
    "carteras_bolsos",
    "zapatos"
  ];
  homeCategories = [
    "Ropa de cama",
    "Ropa de cama infantil",
    "Dormitorio",
    "Cosina",
    "Living",
    "Baño"
  ];
  homeToQuery = [
    "ropa_de_cama",
    "ropa_de_cama_infantil",
    "prod_dormitorio",
    "cosina",
    "living",
    "bano"
  ];

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

  crearCombo = ComboPage;
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
