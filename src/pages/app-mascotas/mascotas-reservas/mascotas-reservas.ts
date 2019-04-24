import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-mascotas-reservas',
  templateUrl: 'mascotas-reservas.html',
})
export class MascotasReservasPage {
  cuponID: string;
  semana: any;
  seleccionPrevia: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController
  ) {

    this.semana = this.tomarHorasActivas(this.navParams.get('semana'));
    this.cuponID = this.navParams.get('cuponID');
    this.seleccionPrevia = this.navParams.get('seleccionPrevia');

    if (this.seleccionPrevia) {
      let indexDia = this.seleccionPrevia.index.indexDia;
      let indexHora = this.seleccionPrevia.index.indexHora;
      this.seleccionarHora(indexDia, indexHora);
    }

  }


  tomarHorasActivas(semana) {
    let semana_con_horas_activas = [];
    semana.forEach(dia => {
      let horasActivas = [];
      dia.horas.forEach(hora => {
        if (hora.isActive) {
          const data = {
            hora: hora.hora,
            isActive: true,
            isSelected: false
          }
          horasActivas.push(data)
        }
      });
      const data = {
        dia: dia.dia,
        num: dia.num,
        horas: horasActivas
      }
      semana_con_horas_activas.push(data);
    });

    return semana_con_horas_activas;
  }

  seleccionarHora(indexDia, indexHora) {

    this.semana.forEach(dia => {
      dia.horas.forEach(hora => {
        hora.isSelected = false;
      });
    });

    this.semana[indexDia].horas[indexHora].isSelected = true;
  }

  close() {

    let flag = false;
    let selection = {}

    this.semana.forEach((dia, i) => {
      dia.horas.forEach((hora, j) => {
        if (hora.isSelected) {
          flag = true;
          selection = {
            index: {
              indexDia: i,
              indexHora: j
            },
            dia: dia.dia,
            num: dia.num,
            hora: hora.hora
          }
        }
      });
    });

    this.viewCtrl.dismiss({ ok: flag, selection });
  }


}
