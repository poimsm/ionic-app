import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController, Slides, Content } from "ionic-angular";
import { ProductoPage } from "../index.pages";
import { SubirProvider } from "../../providers/subir/subir";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs/Subject";
import { HttpClient } from "@angular/common/http";

import {
  OutfitsPage,
  NuevaTiendaPage,
  TiendaPage,
  GuardadoPage,
  PedidosPage,
  NewProductPage,
  NewOutfitPage,
  DeliveryPage,
  CestaPage,
  DirectionPage,
  NewServicePage,
  CuponPage,
  CabanaPage,
  ExplorarPage
} from "../index.pages";
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  cesta = CestaPage;
  delivery = DeliveryPage;
  direction = DirectionPage;

  cupon = CuponPage;
  cabana = CabanaPage;
  outfits = OutfitsPage;
  explorar = ExplorarPage;

  tienda = TiendaPage;
  guardado = GuardadoPage;
  pedidos = PedidosPage;

  crearProducto = NewProductPage;
  crearServicio = NewServicePage;
  crearTienda = NuevaTiendaPage;
  crearOutfit = NewOutfitPage;

  constructor(
    public navCtrl: NavController,
    private _subir: SubirProvider,
    public http: HttpClient
  ) {
    http
      .get("https://jsonplaceholder.typicode.com/users")
      .subscribe(data => console.log(data));
  }
  openPage(pagina) {
    this.navCtrl.push(pagina);
  }
}
