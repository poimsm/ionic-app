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
  NewServicePage,
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

  crearServicio = NewServicePage;

  constructor(
    public navCtrl: NavController,
    private _subir: SubirProvider,
    public http: HttpClient
  ) {
    this.getStuff();
    http
      .get("https://jsonplaceholder.typicode.com/users")
      .subscribe(data => console.log(data));
  }

  getStuff() {
    const url = "https://jsonplaceholder.typicode.com/users";
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "my-auth-token"
    });
    let body = {
      message: "Do you heard me?",
      hola: "hola",
      chao: "chhauu"
    };
    // JSON.stringify(body)
    this.http.post(url, body, { headers }).subscribe();
  }

  openPage(pagina) {
    this.navCtrl.push(pagina);
  }
}
