import { Component, ViewChild } from "@angular/core";
import { Platform, MenuController, NavController, ModalController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { AuthProvider } from "../providers/auth/auth";
import { HomePage } from "../pages/home/home";
import { LoginPage } from '../pages/login/login';
import { AngularFireAuth } from "angularfire2/auth";
import { UsuarioPage } from '../pages/usuario/usuario';
import { PopupsProvider } from '../providers/popups/popups';
import { UpgradePage } from '../pages/upgrade/upgrade';
import { MisPedidosPage } from '../pages/mis-pedidos/mis-pedidos';
import { TiendaEcommercePage, OncePage } from "../pages/index.pages";
import { TiendaAlojamientoPage } from '../pages/tienda-alojamiento/tienda-alojamiento';
import { LocalizacionProvider } from '../providers/localizacion/localizacion';
import { EcommercePage } from '../pages/ecommerce/ecommerce';
import { ComidaPage } from '../pages/comida/comida';

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild("content")
  nav: NavController;

  home = HomePage;
  usuario = UsuarioPage;
  upgrade = UpgradePage;
  pedidos = MisPedidosPage;

  isAuth = false;
  user: any = {};
  token: string;
  isImg = false;
  isTienda = false;
  categorias = [];

  rootPage: any;

  constructor(
    // public navCtrl: NavController,
    public modalCtrl: ModalController,
    private afAuth: AngularFireAuth,
    private menuCtrl: MenuController,
    platform: Platform,
    statusBar: StatusBar,
    private _auth: AuthProvider,
    private _popups: PopupsProvider,
    private _localizacion: LocalizacionProvider,
    splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      this.checkAuthState();
      this.checkAppVersion();
      this.loadCategorias();
    });
  }

  checkAuthState() {
    this._auth.authState.subscribe((data: any) => {
      if (data.isAuth) {
        this.user = data.authData.user;
        this.token = data.authData.token;
        this.isTienda = this.user.isTienda;
      }
      this.isAuth = data.isAuth;
    });
  }

  checkAppVersion() {
    this._popups.checkAppVersion('')
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
  }

  loadCategorias() {
    this._popups.getCategorias()
      .then((data: any) => this.categorias = data.categorias);
  }

  logout() {
    // this.afAuth.auth.signOut().then(() => {
    this._auth.logout(this.token, this.user);
    this.menuCtrl.close();
    // });
  }

  openLogin() {
    const modal = this.modalCtrl.create(LoginPage);
    modal.onDidDismiss(() => console.log('Listo'));
    modal.present();
  }

  openCategoria(tipo, categoria) {
    if (tipo == 'Algo dulce') {
      if (this._localizacion.ciudad) {
        this.nav.push(OncePage, {
          isCategoria: true,
          categoria,
          ciudad: this._localizacion.ciudad
        });
      } else {
        this._localizacion.seleccionarCiudad();
      }
      this.menuCtrl.close();
    }

    if (tipo == 'Comida') {
      if (this._localizacion.ciudad) {
        this.nav.push(ComidaPage, {
          isCategoria: true,
          categoria,
          ciudad: this._localizacion.ciudad
        });
      } else {
        this._localizacion.seleccionarCiudad();
      }
      this.menuCtrl.close();
    }

    if (tipo == 'Compras') {
      if (this._localizacion.ciudad) {
        this.nav.push(EcommercePage, {
          isCategoria: true,
          categoria,
          ciudad: this._localizacion.ciudad
        });
      } else {
        this._localizacion.seleccionarCiudad();
      }
      this.menuCtrl.close();
    }
  }

  openTienda(tipo) {
    // if (tipo == 'DELIVERY_NORMAL') {
    //   this.nav.setRoot(TiendaDeliveryNormalPage, { id: this.user.tienda.id });
    // }
    // if (tipo == 'DELIVERY_DULCE') {
    //   this.nav.setRoot(TiendaDeliveryDulcePage, { id: this.user.tienda.id });
    // }
    // if (tipo == 'ECOMMERCE') {
    //   this.nav.setRoot(TiendaEcommercePage, { id: this.user.tienda.id });
    // }
    // if (tipo == 'ALOJAMIENTO') {
    //   this.nav.setRoot(TiendaAlojamientoPage, { id: this.user.tienda.id });
    // }
    // this.menuCtrl.close();

  }

  openPage(pagina) {
    this.nav.setRoot(pagina);
    this.menuCtrl.close();
  }
}
