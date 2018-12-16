import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController, Slides, Content } from "ionic-angular";
import { SubirProvider } from "../../providers/subir/subir";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs/Subject";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import {
  TiendaPage,
  PedidosPage,
  CestaPage,
  CuponPage,
  CabanaPage,
  ExplorarPage,
  PacksPage
} from "../index.pages";
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  cesta = CestaPage;

  cupon = CuponPage;
  cabana = CabanaPage;
  packs = PacksPage;
  explorar = ExplorarPage;

  tienda = TiendaPage;
  pedidos = PedidosPage;

  constructor(
    public navCtrl: NavController,
    private _subir: SubirProvider,
    public http: HttpClient
  ) { }

  openPage(pagina) {
    this.navCtrl.push(pagina);
  }
}
