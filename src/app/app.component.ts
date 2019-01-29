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
import { TiendaPage } from '../pages/tienda/tienda';
import { TiendaDeliveryDulcePage } from '../pages/tienda-delivery-dulce/tienda-delivery-dulce';
import { TiendaDeliveryNormalPage } from '../pages/tienda-delivery-normal/tienda-delivery-normal';
import { TiendaEcommercePage } from "../pages/index.pages";
import { TiendaAlojamientoPage } from '../pages/tienda-alojamiento/tienda-alojamiento';

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
  tienda = TiendaPage;

  isAuth = false;
  user: any = {};
  token: string;
  isImg = false;
  isTienda = false;

  rootPage: any;

  constructor(
    public modalCtrl: ModalController,
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
          this.isTienda = this.user.isTienda;
        }
        this.isAuth = data.isAuth;
      });

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

    });
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this._auth.logout(this.token, this.user);
      this.menuCtrl.close();
    });
  }

  openLogin() {
    const modal = this.modalCtrl.create(LoginPage);
    modal.onDidDismiss(() => console.log('Listo'));
    modal.present();
  }

  openTienda(tipo) {
    if (tipo == 'DELIVERY_NORMAL') {
      this.nav.setRoot(TiendaDeliveryDulcePage, { id: this.user.tienda });
    }
    if (tipo == 'DELIVERY_DULCE') {
      this.nav.setRoot(TiendaDeliveryNormalPage, { id: this.user.tienda });
    }
    if (tipo == 'ECOMMERCE') {
      this.nav.setRoot(TiendaEcommercePage, { id: this.user.tienda });
    }
    if (tipo == 'ALOJAMIENTO') {
      this.nav.setRoot(TiendaAlojamientoPage, { id: this.user.tienda });
    }
    this.menuCtrl.close();

  }

  openPage(pagina) {
    this.nav.setRoot(pagina);
    this.menuCtrl.close();
  }
}
