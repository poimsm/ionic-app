import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigProvider } from '../config/config';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class SeccionesProvider {
  apiURL: string;

  // tiendas: any;
  tipo: string;

  tiendas = new Subject<any>();


  constructor(public http: HttpClient,
    private _config: ConfigProvider
  ) {
    this.apiURL = this._config.apiURL;
  }

  buscarTiendasDeEstiloPorCategorias(categoria) {
    const url = `${this.apiURL}/mascotas/buscar-tiendas-por-categoria/?categoria=${categoria}`;
    this.http.get(url).toPromise()
      .then(data => {
        this.tiendas.next(data);
      });
  }

  buscarTiendasDeBellezaPorCategorias(categoria) {
    const url = `${this.apiURL}/mascotas/all`;
    this.http.get(url).toPromise()
      .then(data => {
        this.tiendas.next(data);
      });
  }

  buscarTiendasDeMascotasPorCategorias(categoria) {
    const url = `${this.apiURL}/mascotas/all`;
    this.http.get(url).toPromise()
      .then(data => {
        this.tiendas.next(data);
      });
  }

  cambiarTipo(tipo) {
    this.tipo = tipo;
  }

}
