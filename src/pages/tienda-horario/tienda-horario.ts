import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Select } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tienda-horario',
  templateUrl: 'tienda-horario.html',
})
export class TiendaHorarioPage {

  @ViewChild('horaRef') horaRef: Select;

  dia = 'Lunes';
  horario = [];
  inicios = [];
  cierres = [];
  tipoHora: string;

  matriz = [
    {
      dia: 'Lunes',
      inicio: '',
      cierre: ''
    },
    {
      dia: 'Martes',
      inicio: '',
      cierre: ''
    }
  ]

  isLunes = false;
  isMartes = false;
  isMiercoles = false;
  isJueves = false;
  isViernes = false;
  isSabado = false;
  isDomingo = false;

  inicioLunes: string;
  inicioMartes: string;
  inicioMiercoles: string;
  inicioJueves: string;
  inicioViernes: string;
  inicioSabado: string;
  inicioDomingo: string;

  cierreLunes: string;
  cierreMartes: string;
  cierreMiercoles: string;
  cierreJueves: string;
  cierreViernes: string;
  cierreSabado: string;
  cierreDomingo: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  select(dia) {
    let flag = false;

    this.horario.forEach(item => {
      if (item.dia == dia) {

        flag = true
      }
    });

    this.checkIfCompleted();
    this.dia = '';
    setTimeout(() => {

      this.dia = dia;
    }, 300);
  }

  openSelect(tipo) {
    if (tipo == 'inicio') {
      this.horaRef.open();
    }
  }

  onSelectChange(value) {
    if (this.tipoHora == 'inicio') {
      const data = {
        dia: this.dia,
        horaInicio: value
      }
      this.inicios.push(data);
    }

    if (this.tipoHora == 'cierre') {
      const data = {
        dia: this.dia,
        horaInicio: value
      }
      this.cierres.push(data);
    }
  }

  checkIfCompleted() {
    const dias = [
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
      'Domingo'
    ];

    // dias.forEach(item => {
    //   if (this.dia)
    // })
    console.log('pasooo');
    console.log(this.inicioLunes);
    console.log(this.cierreLunes);
    console.log(this.dia);

    if (this.dia == 'Lunes' && this.inicioLunes && this.cierreLunes) {
      const data = {
        dia: this.dia,
        inicio: this.inicioLunes,
        cierre: this.cierreLunes
      }
      this.horario.push(data);
      this.isLunes = true;
      console.log(this.isLunes);

    }

    if (this.dia == 'Martes' && this.inicioMartes && this.cierreMartes) {
      const data = {
        dia: this.dia,
        inicio: this.inicioMartes,
        cierre: this.cierreMartes
      }
      this.horario.push(data);
      this.isMartes = true;
    }

    if (this.dia == 'Miércoles' && this.inicioMiercoles && this.cierreMiercoles) {
      const data = {
        dia: this.dia,
        inicio: this.inicioMiercoles,
        cierre: this.cierreMiercoles
      }
      this.horario.push(data);
      this.isMiercoles = true;
    }

    if (this.dia == 'Jueves' && this.inicioJueves && this.cierreJueves) {
      const data = {
        dia: this.dia,
        inicio: this.inicioJueves,
        cierre: this.cierreJueves
      }
      this.horario.push(data);
      this.isJueves = true;
    }

    if (this.dia == 'Viernes' && this.inicioViernes && this.cierreViernes) {
      const data = {
        dia: this.dia,
        inicio: this.inicioViernes,
        cierre: this.cierreViernes
      }
      this.horario.push(data);
      this.isViernes = true;
    }

    if (this.dia == 'Sábado' && this.inicioSabado && this.cierreSabado) {
      const data = {
        dia: this.dia,
        inicio: this.inicioSabado,
        cierre: this.cierreSabado
      }
      this.horario.push(data);
      this.isSabado = true;
    }

    if (this.dia == 'Domingo' && this.inicioDomingo && this.cierreDomingo) {
      const data = {
        dia: this.dia,
        inicio: this.inicioDomingo,
        cierre: this.cierreDomingo
      }
      this.horario.push(data);
      this.isDomingo = true;
    }

  }

  save() {

    console.log(this.matriz);
  }

}
