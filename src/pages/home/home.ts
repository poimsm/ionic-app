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
import { LavadoPage } from "../lavado/lavado";
import { MascotasPage } from "../mascotas/mascotas";
import { SuperPage } from "../super/super";
import { AlquilerPage } from "../alquiler/alquiler";
import { MueblesPage } from "../muebles/muebles";
import { TiendaMueblesPage } from "../tienda-muebles/tienda-muebles";
import { Muebles2Page } from "../muebles2/muebles2";
import { BellezaPage } from "../belleza/belleza";
import { TiendaMascotasPage } from "../tienda-mascotas/tienda-mascotas";
import { TiendaMascotasStartPage } from "../tienda-mascotas-start/tienda-mascotas-start";
import { BikePage } from "../bike/bike";


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
  lavado = LavadoPage;
  mascotas = MascotasPage;
  super = SuperPage;
  alquiler = AlquilerPage;
  muebles = MueblesPage;
  muebles2 = Muebles2Page;
  belleza = BellezaPage;
  bike = BikePage;

  cosas = [];
  algoDulce = [];
  comidas = [];
  productos = [];

  mensaje = '';

  showFormulario = false;

  user: any;
  token: string;
  isAuth = false;
  ciudad: string;
  tortas = [];
  kuchenes = [];
  cupcakes = [];

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

    this.ciudad = this._localizacion.ciudad;

    this.setLocalizacion();
    this.getAlgoDulce();
    this.getComida();
    this.getEcommerce();
  }

  getTortas() {
    this._data.fetchAlgoDulceHomeCategoria(this.ciudad, 'Tortas')
      .then((data: any) => this.tortas = data);
  }

  getKuchenes() {
    this._data.fetchAlgoDulceHomeCategoria(this.ciudad, 'Kuchen')
      .then((data: any) => this.tortas = data);
  }

  getCupcakes() {
    this._data.fetchAlgoDulceHomeCategoria(this.ciudad, 'Cupcakes')
      .then((data: any) => this.tortas = data);
  }

  getCosas() {
    this._data.fetchCosas()
      .then((data: any) => this.cosas = data);
  }

  getAlgoDulce() {
    this._data.fetchAlgoDulceHome(this.ciudad)
      .then((data: any) => this.algoDulce = data);
  }

  getComida() {
    this._data.fetchComida(this.ciudad)
      .then((data: any) => this.comidas = data);
  }

  getEcommerce() {
    this._data.fetchEcommerce(this.ciudad)
      .then((data: any) => this.productos = data
      );
  }

  setLocalizacion() {
    this._localizacion.seleccionarCiudad()
      .then((data: any) => {
        if (data.ok) {
          this.ciudad = data.ciudad,
            this.reloadInicio();
        }
      });
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

  openSuper() {
    this.navCtrl.push(SuperPage, { tipo: 'super' })
  }

  openModelo(pagina) {
    this.navCtrl.push(pagina);
  }

  openEcommerce() {
    this.navCtrl.push(EcommercePage, {
      isCategoria: false,
      categoria: 'none',
      ciudad: this._localizacion.ciudad
    });
  }

  openCarro() {
    this.navCtrl.push(CarroPage);
  }

  openUser() {
    if (this.isAuth) {

      if (this.user.tipo == 'cuenta tienda') {
        this.openTienda();
      } else {
        this.openUsuario();
      }

    } else {
      this.navCtrl.push(LoginPage);
    }
  }

  openTienda() {
    if (this.user.tienda.tipo == 'mascotas') {
      this._data.fetchTienda(this.user.tienda.id).then((data: any) => {
        
        if (data.isFirstLoggin) {
          this.openModalStart();
        } else {
          this.navCtrl.push(TiendaMascotasPage, { tiendaID: this.user.tienda.id });
        }
      });
    }

    if (this.user.tienda.tipo == 'super') {
      console.log('Do your magic');      
    }
  }

  openUsuario() {
    this.navCtrl.push(UsuarioPage, {
      user: this.user,
      token: this.token
    });
  }

  openModalStart() {
    const modal = this.modalCtrl.create(TiendaMascotasStartPage, { tiendaID: this.user.tienda.id, token: this.token });
    modal.onDidDismiss(res => {
      if (res.ok) {
        this.navCtrl.push(TiendaMascotasPage, { tiendaID: this.user.tienda.id });
      }
    });
    modal.present();
  }

  reloadInicio() {
    this.productos = [];
    this.comidas = [];
    this.algoDulce = [];
    this.getAlgoDulce();
    this.getComida();
    this.getEcommerce();
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
