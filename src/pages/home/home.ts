import { Component } from "@angular/core";
import { NavController, Platform, ModalController } from 'ionic-angular';
import { OncePage } from '../once/once';
import { UsuarioPage } from '../usuario/usuario';
import { AuthProvider } from '../../providers/auth/auth';
import { BandejaPage } from '../bandeja/bandeja';
import { ComprasPage } from '../compras/compras';
import { FormularioPage } from '../formulario/formulario';
import { PopupsProvider } from '../../providers/popups/popups';
import { CarroPage } from '../carro/carro';
import { FrutasPage } from '../frutas/frutas';
import { NocturnoPage } from '../nocturno/nocturno';
import { EstiloPage } from '../estilo/estilo';
import { LocalizacionPage } from '../localizacion/localizacion';
import { LoginPage } from '../login/login';
import { LocalizacionProvider } from '../../providers/localizacion/localizacion';
import { ComidaPage } from '../comida/comida';


@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {

  once = OncePage;
  usuario = UsuarioPage;
  carro = CarroPage;
  compras = ComprasPage;
  bandeja = BandejaPage;
  formulario = FormularioPage;
  frutas = FrutasPage;
  nocturno = NocturnoPage;
  estilo = EstiloPage;
  comida = ComidaPage;

  mensaje = '';

  showFormulario = false;

  user: any;
  isAuth = false;

  constructor(
    public navCtrl: NavController,
    private _auth: AuthProvider,
    private _popups: PopupsProvider,
    private platform: Platform,
    public modalCtrl: ModalController,
    private _localizacion: LocalizacionProvider

  ) {
    if (!this.platform.is('cordova')) {
      this.showFormulario = true;
    }
    this._localizacion.showRadio();
  }

  ionViewDidLoad() {

    this._auth.authState.subscribe((data: any) => {

      if (data.isAuth) {
        this.user = data.authData.user;
        this.isAuth = true;
      }
    });
    this.mensaje = this._popups.mensajeHome;
  }

  setLocalizacion() {
    this._localizacion.showRadio();
  }


  openModal() {
    const modal = this.modalCtrl.create(LocalizacionPage);
    modal.onDidDismiss(data => {
      if (data.ok) {
        console.log(data.ciudad);
      }
    });
    modal.present();
  }

  openPage(pagina) {
    if (this._localizacion.ciudad) {
      this.navCtrl.push(pagina, {
        isCategoria: false,
        categoria: 'none',
        ciudad: this._localizacion.ciudad
      });
    } else {
      this._localizacion.showRadio();
    }
  }

  openUser() {
    if (this.isAuth) {
      this.navCtrl.push(UsuarioPage, { id: this.user.tienda.id });
    } else {
      this.navCtrl.push(LoginPage);
    }
  }

  reloadInicio() {
    console.log('Recargado');
  }
}
