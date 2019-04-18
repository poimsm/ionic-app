import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tienda-mascotas-agenda',
  templateUrl: 'tienda-mascotas-agenda.html',
})
export class TiendaMascotasAgendaPage {
  semana = [
    {
      isActive: true,
      dia: 'Lun',
      num: 13
    },
    {
      isActive: false,
      dia: 'Mar',
      num: 14
    },
    {
      isActive: false,
      dia: 'Mié',
      num: 15
    },
    {
      isActive: false,
      dia: 'Jue',
      num: 16
    },
    {
      isActive: false,
      dia: 'Vie',
      num: 17
    },
    {
      isActive: false,
      dia: 'Sáb',
      num: 18
    },
    {
      isActive: false,
      dia: 'Dom',
      num: 19
    }
  ];

  preIndex = 0;
  horas = [];
  horas_bloque = [];
  horas_Model = [];
  horas_bloque_Model = [];
  week = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.generarHoras(15);
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

  addHora(index) {
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
      console.log(this.horas);
      console.log(this.horas_Model);
    }
    this.preIndex = index;    
  }

  reset() {
    this.horas_bloque_Model.forEach(item => {
      item.isActive = false;
    });
    this.horas_Model.forEach(item => {
      item.isActive = false;
    });
  }

  addBloque(index) {
    if (this.horas_bloque[index].isActive) {
      this.horas_bloque[index].isActive = false;
    } else {
      this.horas_bloque[index].isActive = true;
    }
  }

}
