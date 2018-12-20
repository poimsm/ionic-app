import { Component } from "@angular/core";
import { NavController} from "ionic-angular";
import { RecreacionPage } from '../recreacion/recreacion';
import { DeportePage } from '../deporte/deporte';
import { FrutaPage } from '../fruta/fruta';
import { OncePage } from '../once/once';
import { UsuarioPage } from '../usuario/usuario';
import { MisComprasPage } from '../mis-compras/mis-compras';

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {

  recreacion = RecreacionPage;
  deporte = DeportePage;
  fruta = FrutaPage;
  once = OncePage;
  usuario = UsuarioPage;
  misCompras = MisComprasPage

  constructor(
    public navCtrl: NavController
  ) { }

  openPage(pagina) {
    this.navCtrl.push(pagina);
  }
}
