import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigProvider } from "../config/config";


@Injectable()
export class SemanaProvider {

  semana = [];

  preIndex = 0;
  horas = [];
  horas_tem = [];

  week = [];
  calendario = [];

  apiURL: string;

  esDiaPasado = false;
  hoy: any;

  constructor(
    public http: HttpClient,
    private _config: ConfigProvider
  ) {
    this.apiURL = this._config.apiURL;
    console.log('hola semana!');
    this.obtenerHoy();
    this.construirSemana();
    this.generarHoras(15);
  }

  obtenerSemanaSERVER() {
    const url = `${this.apiURL}/mascotas/obtener-semana`;
    return this.http.get(url).toPromise();
  }

  obtenerHoy() {
    const url = `${this.apiURL}/mascotas/obtener-dia-de-hoy`;
    return this.http.get(url).toPromise();
  }

  construirSemana() {
    this.obtenerSemanaSERVER().then((data: any) => {

      data.forEach(item => {
        this.semana.push({
          isActive: false,
          dia: item.dia,
          num: item.num,
          horas: []
        });
      });

      this.obtenerHoy().then(data => {
        this.hoy = data;
        this.actualizarDiaPasadoFlag(0);
      });

      this.semana[0].isActive = true;
    });
  }

  actualizarDiaPasadoFlag(index) {
    if (this.semana[index].num < this.hoy.num) {
      this.esDiaPasado = true;
    } else {
      this.esDiaPasado = false;
    }
  }

  generarHoras(skip) {

    let horas = [];

    let hora = 0;
    let minutos = 0;

    let text = '';
    let text_hora = '';
    let text_min = '';

    // horas comienzan a las 8 AM
    for (let j = 8; j <= 19; j++) {
      hora = j;

      if (hora < 10) {
        text_hora = `0${hora}`;
      } else {
        text_hora = `${hora}`;
      }

      for (let i = 0; i <= 45; i += skip) {

        minutos = i;
        if (minutos == 0) {
          text_min = `0${minutos}`;
        } else {
          text_min = `${minutos}`;
        }
        text = `${text_hora}:${text_min}`;
        let data = {
          text,
          isActive: false
        }

        horas.push(data);
      }
    }

    this.horas = JSON.parse(JSON.stringify(horas));
    this.horas_tem = JSON.parse(JSON.stringify(horas));
  }

  addHora(index, diaPasado) {

    if (diaPasado) {
      return;
    }

    if (index == 0) {
      return
    }
    if (this.horas[index].isActive) {
      this.horas[index].isActive = false;
    } else {
      this.horas[index].isActive = true;
    }
  }

  addDia(index) {

    this.actualizarDiaPasadoFlag(index);

    this.semana.forEach(dia => {
      dia.isActive = false;
    });

    this.semana[index].isActive = true;

    this.semana[this.preIndex].horas = JSON.parse(JSON.stringify(this.horas));

    if (this.semana[index].horas.length > 0) {
      this.horas = JSON.parse(JSON.stringify(this.semana[index].horas));
    } else {
      this.horas = JSON.parse(JSON.stringify(this.horas_tem));
    }
    this.preIndex = index;
  }

  close() {
    this.addDia(this.preIndex);
  }

  obtener_semana() {
    // Todas las horas activas estan desplazada una posicion

    let semana_ok = [];
    let dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    this.semana.forEach((dia, i) => {

      let flag = false;

      dia.horas.forEach(item => {
        if (item.isActive) {
          flag = true;
        }
      });

      if (flag) {
        let horas = [];

        dia.horas.forEach((hora, i) => {
          if (hora.isActive) {
            const horaActiva = {
              hora: dia.horas[i - 1].text,
              isActive: true
            }
            horas.push(horaActiva);
          }
        });

        let data = {
          dia: dias[i],
          num: dia.num,
          horas: horas
        }
        semana_ok.push(data);
      }

    });

    return semana_ok;
  }

}
