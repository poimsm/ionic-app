import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigProvider } from "../config/config";

@Injectable()
export class AgendaProvider {

  apiURL: string;

  dias = [];

  fechas = [];
  ultimaFecha: string;

  constructor(
    public http: HttpClient,
    private _config: ConfigProvider
  ) {
    console.log('hola agenda!')
    this.apiURL = this._config.apiURL;
  }

  construirDias(tiendaID) {

    return new Promise((resolve, reject) => {
      this.obtenerFechas().then((res: any) => {

        let promesas = [];
        this.ultimaFecha = res.fechas[5]
        res.fechas.forEach(fecha => {
          promesas.push(this.buscarDia(tiendaID, fecha));
        });

        Promise.all(promesas).then(dias => {
          this.compararConTiempoServidor(dias)
            .then(dataCorregida => {
              resolve(dataCorregida);
            });
        });

      })

    });
  }

  compararConTiempoServidor(dias) {
    return new Promise((resolve, reject) => {
      let data = [];
      this.obtenerTiempoServidor()
        .then((res: any) => {
          dias.forEach(dia => {
            if (dia.milisegundos > res.milisegundos) {
              data.push(Object.assign({}, { isActual: true, isActive: false }, dia));
            } else {
              data.push(Object.assign({}, { isActual: false, isActive: false }, dia));
            }
          });
          resolve(data);
        });
    });
  }


  obtenerFechas() {
    const url = `${this.apiURL}/mascotas/agenda/fechas`;
    return this.http.get(url).toPromise();
  }

  obtenerTiempoServidor() {
    const url = `${this.apiURL}/mascotas/agenda/tiempo-servidor`;
    return this.http.get(url).toPromise();
  }

  inicializarAgenda(tiendaID) {
    const url = `${this.apiURL}/mascotas/agenda/inicializar?id=${tiendaID}`;
    return this.http.get(url).toPromise();
  }

  buscarDia(tiendaID, fecha) {
    const url = `${this.apiURL}/mascotas/agenda/buscar-dia?id=${tiendaID}&fecha=${fecha}`;
    return this.http.get(url).toPromise();
  }

  actualizarDias(dias) {
    const promesas = [];
    dias.forEach(dia => {
      const url = `${this.apiURL}/mascotas/agenda/update-dia?id=${dia._id}`;
      promesas.push(this.http.put(url, dia).toPromise());
    });
    Promise.all(promesas);
  }

  bookDay(id, tipo, index) {
    const url = `${this.apiURL}/mascotas/agenda/book-day?id=${id}&tipo=${tipo}&index=${index}`;
    return this.http.get(url).toPromise();
  }

}
