import { Component } from "@angular/core";
import { NavController, Platform, ModalController } from 'ionic-angular';
import { OncePage } from '../app-once/once/once';
import { UsuarioPage } from '../usuario/usuario/usuario';
import { AuthProvider } from '../../providers/auth/auth';
import { FormularioPage } from '../tools/formulario/formulario';
import { PopupsProvider } from '../../providers/popups/popups';
import { CarroPage } from '../carro/carro/carro';
import { EstiloPage } from '../experimental/estilo/estilo';
import { LoginPage } from '../usuario/login/login';
import { LocalizacionProvider } from '../../providers/localizacion/localizacion';
import { ComidaPage } from '../app-comida/comida/comida';
import { EcommercePage } from "../app-ecommerce/ecommerce/ecommerce";
import { CarroProvider } from '../../providers/carro/carro';
import { DataProvider } from '../../providers/data/data';
import { OnceContentPage } from "../app-once/once-content/once-content";
import { EcommerceContentPage } from '../app-ecommerce/ecommerce-content/ecommerce-content';
import { ComidaContentPage } from '../app-comida/comida-content/comida-content';
import { LavadoPage } from "../experimental/lavado/lavado";
import { MascotasPage } from "../app-mascotas/mascotas/mascotas";
import { SuperPage } from "../app-super/super/super";
import { AlquilerPage } from "../experimental/alquiler/alquiler";
import { MueblesPage } from "../app-muebles/muebles/muebles";
import { Muebles2Page } from "../app-muebles/muebles2/muebles2";
import { BellezaPage } from "../experimental/belleza/belleza";
import { TiendaMascotasPage } from "../app-mascotas/tienda-mascotas/tienda-mascotas";
import { BikePage } from "../app-bike/bike/bike";
import { FormularioStartPage } from "../tools/formulario-start/formulario-start";
import { SuperTiendasPage } from "../app-super/super-tiendas/super-tiendas";


@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {

  once = OncePage;
  usuario = UsuarioPage;
  carro = CarroPage;
  formulario = FormularioPage;
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
    // const modal = this.modalCtrl.create(LocalizacionPage);
    // modal.onDidDismiss(data => {
    //   if (data.ok) {
    //     console.log(data.ciudad);
    //   }
    // });
    // modal.present();
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
    this.navCtrl.push(SuperTiendasPage, { tipo: 'super' })
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
      this._data.getOneTienda_Mascota(this.user.tienda.id).then((data: any) => {
        
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
    const modal = this.modalCtrl.create(FormularioStartPage, { tiendaID: this.user.tienda.id, token: this.token });
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
