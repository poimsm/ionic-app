import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { OncePage } from '../once/once';
import { UsuarioPage } from '../usuario/usuario';
import { AuthProvider } from '../../providers/auth/auth';
import { BandejaPage } from '../bandeja/bandeja';
import { ComprasPage } from '../compras/compras';
import { FormularioPage } from '../formulario/formulario';
import { PopupsProvider } from '../../providers/popups/popups';
import { CarroPage } from '../carro/carro';

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

  mensaje = '';

  user: any;

  constructor(
    public navCtrl: NavController,
    private _auth: AuthProvider,
    private _popups: PopupsProvider
  ) { }

  ionViewDidLoad() {
    this._auth.authState.subscribe((data: any) => {

      if (data.isAuth) {
        this.user = data.authData.user;
      }
    });
    this.mensaje = this._popups.mensajeHome;
  }

  openPage(pagina) {
    this.navCtrl.push(pagina);
  }
}
