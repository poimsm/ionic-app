import { Component } from "@angular/core";
import { NavController, Platform, ModalController } from 'ionic-angular';
import { OncePage } from '../once/once';
import { UsuarioPage } from '../usuario/usuario';
import { AuthProvider } from '../../providers/auth/auth';
import { BandejaPage } from '../bandeja/bandeja';
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
import { EcommercePage } from "../ecommerce/ecommerce";
import { CarroProvider } from '../../providers/carro/carro';
import { DataProvider } from '../../providers/data/data';
import { OnceContentPage } from "../once-content/once-content";
import { EcommerceContentPage } from '../ecommerce-content/ecommerce-content';
import { ComidaContentPage } from '../comida-content/comida-content';
import { CarroPagarPage } from '../carro-pagar/carro-pagar';


@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {

  once = OncePage;
  usuario = UsuarioPage;
  carro = CarroPage;
  bandeja = BandejaPage;
  formulario = FormularioPage;
  frutas = FrutasPage;
  nocturno = NocturnoPage;
  estilo = EstiloPage;
  comida = ComidaPage;
  ecommerce = EcommercePage;

  cosas = [];
  algoDulce = [];
  comidas = [];
  productos = [];

  mensaje = '';

  showFormulario = false;

  user: any;
  token: string;
  isAuth = false;

  constructor(
    public navCtrl: NavController,
    private _auth: AuthProvider,
    private _popups: PopupsProvider,
    private platform: Platform,
    public modalCtrl: ModalController,
    private _localizacion: LocalizacionProvider,
    private _carro: CarroProvider,
    private _data: DataProvider

  ) {
    if (!this.platform.is('cordova')) {
      this.showFormulario = true;
    }
    // if (!this._localizacion.ciudad) {
    //   this._localizacion.seleccionarCiudad();
    // }
  }

  ionViewDidLoad() {

    this._auth.authState.subscribe((data: any) => {

      if (data.isAuth) {
        this.user = data.authData.user;
        this.token = data.authData.token;
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });
    this.mensaje = this._popups.mensajeHome;
    // this.getCosas();
    this.getAlgoDulce();
    this.getComida();
    this.getEcommerce();
  }

  getCosas() {
    this._data.fetchCosas()
      .then((data: any) => {
        console.log(data);

        this.cosas = data;
      });
  }

  getAlgoDulce() {
    this._data.fetchAlgoDulceHome()
      .then((data: any) => this.algoDulce = data);
  }

  getComida() {
    this._data.fetchComida()
      .then((data: any) => this.comidas = data);
  }

  getEcommerce() {
    this._data.fetchEcommerce()
      .then((data: any) => this.productos = data
      );
  }

  setLocalizacion() {
    this._localizacion.seleccionarCiudad();
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
      this._localizacion.seleccionarCiudad()
        .then((data: any) => {
          if (data.ok) {
            this.navCtrl.push(pagina, {
              isCategoria: false,
              categoria: 'none',
              ciudad: data.ciudad
            });
          }
        });
    }
  }

  openEcommerce() {
    this.navCtrl.push(EcommercePage, {
      isCategoria: false,
      categoria: 'none',
      ciudad: this._localizacion.ciudad
    });
  }

  openCarro() {
    this.navCtrl.push(CarroPagarPage);
  }

  openUser() {
    if (this.isAuth) {
      this.navCtrl.push(UsuarioPage, {
        tiendaID: this.user.tienda.id,
        user: this.user,
        token: this.token
      });
    } else {
      this.navCtrl.push(LoginPage);
    }
  }

  reloadInicio() {
    // this.getCosas();
    this.getAlgoDulce();
    this.getEcommerce();
    this.getComida();
  }

  openContent(item, tipo) {
    if (tipo == 'once') {
      this.navCtrl.push(OnceContentPage, { once: item });
    }

    if (tipo == 'comida') {
      this.navCtrl.push(ComidaContentPage, { once: item });
    }

    if (tipo == 'ecommerce') {
      this.navCtrl.push(EcommerceContentPage, { once: item });
    }
  }
}
