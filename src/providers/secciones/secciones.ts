import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigProvider } from '../config/config';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class SeccionesProvider {
  apiURL: string;

  // tiendas: any;
  tipo: string;
  categoria: string;
  tiendas = new Subject<any>();
  todasLasTiendas = new Subject<any>();


  constructor(public http: HttpClient,
    private _config: ConfigProvider
  ) {
    this.apiURL = this._config.apiURL;
  }

  buscarTiendasPorCategorias(categoria) {
    const url = `${this.apiURL}/mascotas/buscar-tiendas-por-categoria/?categoria=${categoria}&tipo=${this.tipo}`;
    this.http.get(url).toPromise()
      .then(data => {
        this.tiendas.next(data);
      });
  }

  buscarTiendasPorTipo() {
    const url = `${this.apiURL}/mascotas/buscar-tiendas-por-categoria/?categoria=todo&tipo=${this.tipo}`;
    this.http.get(url).toPromise()
      .then(data => {
        this.todasLasTiendas.next(data);
      });
  }



  cambiarTipo(tipo) {
    this.tipo = tipo;
  }

}
