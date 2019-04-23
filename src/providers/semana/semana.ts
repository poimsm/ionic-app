import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigProvider } from "../config/config";


@Injectable()
export class SemanaProvider {

  semana = [];

  preIndex = 0;
  horas = [];
  horas_bloque = [];
  horas_Model = [];
  horas_bloque_Model = [];
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

  obtenerSemana() {
    const url = `${this.apiURL}/mascotas/obtener-semana`;
    return this.http.get(url).toPromise();
  }

  obtenerHoy() {
    const url = `${this.apiURL}/mascotas/obtener-dia-de-hoy`;
    return this.http.get(url).toPromise();
  }

  construirSemana() {
    this.obtenerSemana().then((data: any) => {



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

    let horas_bloque = [];
    let counter = 0;
    for (let i = 0; i < horas.length; i++) {
      if (counter < horas.length) {
        let data = {
          text1: horas[counter].text,
          text2: horas[counter + 1].text,
          isActive: false
        }
        counter = counter + 2;
        horas_bloque.push(data);
      }
    }
    this.horas = JSON.parse(JSON.stringify(horas));
    this.horas_Model = JSON.parse(JSON.stringify(horas));

    this.horas_bloque = JSON.parse(JSON.stringify(horas_bloque));
    this.horas_bloque_Model = JSON.parse(JSON.stringify(horas_bloque));
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
    this.addBloque(index);
  }

  addDia(index) {

    this.actualizarDiaPasadoFlag(index);

    this.semana.forEach(dia => {
      dia.isActive = false;
    });

    this.semana[index].isActive = true;
    this.week = this.semana.slice();

    this.week[this.preIndex].horasBloque = JSON.parse(JSON.stringify(this.horas_bloque));
    this.week[this.preIndex].horas = JSON.parse(JSON.stringify(this.horas));

    if (this.week[index].horas) {
      this.horas = JSON.parse(JSON.stringify(this.week[index].horas));
      this.horas_bloque = JSON.parse(JSON.stringify(this.week[index].horasBloque));
    } else {
      this.horas = JSON.parse(JSON.stringify(this.horas_Model));
      this.horas_bloque = JSON.parse(JSON.stringify(this.horas_bloque_Model));
    }
    this.preIndex = index;
  }

  close() {
    this.addDia(this.preIndex);
    console.log(this.semana);
    
  }

  addBloque(index) {
    if (this.horas_bloque[index-1].isActive) {
      this.horas_bloque[index-1].isActive = false;
    } else {
      this.horas_bloque[index-1].isActive = true;
    }
  }

  obtener_semana() {
    let semana_ok = [];
    this.semana.forEach(dia => {

      if (dia.horas) {
        let horas = [];

        dia.horas.forEach(hora => {
          if (hora.isActive) {
           horas.push(hora);
          }
        });
  
        let data = {
          dia: dia.dia,
          num: dia.num,
          horas: horas        
        }
       semana_ok.push(data);
      }
     
    });

    console.log('OK',semana_ok);
    

    return semana_ok;
  }

}
