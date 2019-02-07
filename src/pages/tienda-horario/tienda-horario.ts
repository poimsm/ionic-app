import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Select } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-tienda-horario',
  templateUrl: 'tienda-horario.html',
})
export class TiendaHorarioPage {

  @ViewChild('horaRef') horaRef: Select;

  dia = 'Lunes';

  matriz = [
    {
      dia: 'LUNES',
      inicio: '',
      cierre: ''
    },
    {
      dia: 'MARTES',
      inicio: '',
      cierre: ''
    },
    {
      dia: 'MIERCOLES',
      inicio: '',
      cierre: ''
    },
    {
      dia: 'JUEVES',
      inicio: '',
      cierre: ''
    },
    {
      dia: 'VIERNES',
      inicio: '',
      cierre: ''
    },
    {
      dia: 'SABADO',
      inicio: '',
      cierre: ''
    },
    {
      dia: 'DOMINGO',
      inicio: '',
      cierre: ''
    }
  ];

  tiendaID: string;
  horario: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _data: DataProvider
  ) {
    this.tiendaID = this.navParams.get('tiendaID');
    this.horario = this.navParams.get('horario');
    if (this.horario.isActive) {
      this.horario.array.forEach((item, j) => {
        this.matriz.forEach((data, i) => {
          if (data.dia == item.dia) {
            console.log(this.matriz[i]);
            console.log(this.horario[j]);

            this.matriz[i] = this.horario.array[j]
          }
        });
      });

      // this.matriz = this.horario.array;
    }
  }

  select(dia) {
    this.dia = '';
    setTimeout(() => {
      this.dia = dia;
    }, 300);
  }

  save() {
    const payload = [];
    this.matriz.forEach(item => {
      if (item.inicio && item.cierre) {
        payload.push(item)
      }
    });
    const body = {
      isActive: true,
      array: payload
    }
    this._data.updateTiendaHorario(this.tiendaID, body)
      .then(() => console.log('listo'));
  }

}
