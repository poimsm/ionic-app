import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-mascotas-reservas',
  templateUrl: 'mascotas-reservas.html',
})
export class MascotasReservasPage {
  cuponID: string;
  semana: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.semana = this.navParams.get('semana');
    // this.semana = this.corregirDatos(this.navParams.get('semana'));
    this.cuponID = this.navParams.get('cuponID');
    console.log(this.semana);
    console.log(this.cuponID);

  }

  corregirDatos(semana) {
    let semana_OK = [];
    semana.forEach(item => {
      
      if (item.bloque) {

        let horas = [];

        item.bloque.forEach((bloque, i) => {
          let hora
          if (i % 2 == 0) {
            hora = bloque.text2
          } else if (i == 0) {
            hora = bloque.text1
          } else {
            hora = bloque.text1

          }
        });
        
       

        let data = {
          dia: item.dia,
          num: item.num,
          horas: ''
        }
        semana_OK.push(item);
      }
    });
    return semana_OK;
  }

}
