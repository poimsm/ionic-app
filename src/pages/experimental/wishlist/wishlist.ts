import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WishlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wishlist',
  templateUrl: 'wishlist.html',
})
export class WishlistPage {
  
  isReserva = false;
  showHour = false;
  allGood = true;

  imagenes = [];
  reservas = [];
  hora24 = '18:30';
  hora = 6;
  min = 30;
  tiempo = 'PM';

  dia: string;

  dias: any = [
    {
      horas: []
    },
    {
      horas: []
    },
    {
      horas: []
    },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WishlistPage');
  }

  changeHora(tipo) {
    if (tipo == '+') {
      if (this.hora == 12) {
        this.hora = 0;
      } else {
        this.hora += 1;
      }
    }
    if (tipo == '-') {
      if (this.hora == 0) {
        this.hora = 12;
      } else {
        this.hora -= 1;
      }
    }
    this.actualizarHora24();
  }

  changeMin(tipo) {
    if (tipo == '+') {
      if (this.min == 45) {
        this.min = 0;
      } else {
        this.min += 15;
      }
    }
    if (tipo == '-') {
      if (this.min == 0) {
        this.min = 45;
      } else {
        this.min -= 15;
      }
    }
    this.actualizarHora24();
  }

  changeTiempo(tipo) {
    if (tipo == '+') {
      if (this.tiempo == 'PM') {
        this.tiempo = 'AM';
      } else {
        this.tiempo = 'PM';
      }
    }
    if (tipo == '-') {
      if (this.tiempo == 'PM') {
        this.tiempo = 'AM';
      } else {
        this.tiempo = 'PM';
      }
    }
    this.actualizarHora24();
  }

  actualizarHora24() {
    let hora = this.hora;
    let min = this.min.toString();
    if (this.tiempo == 'PM') {
      hora += 12;
    }
    if (this.min == 0) {
      min = '00';
    }
    this.hora24 = `${hora}:${min}`;
  }

  openHora(dia) {
    this.dia = dia;
    this.showHour = true;
  }

  closeHora(add) {
    if (add) {
      this.addHora(this.dia);
    }
    this.showHour = false;
  }

  delHora(indexDia, indexHora) {
    this.dias[indexDia].horas.splice(indexHora, 1);
  }

  addHora(dia) {

    const hora = this.hora24;
    let foundDay = false;
    let foundHour = false;
    let indexDay = 0;
    let indexHour = 0;

    this.dias.forEach((item, i) => {
      if (item.dia == dia) {
        foundDay = true;
        indexDay = i;
      }
    });

    if (this.dias[indexDay].horas.length > 0) {
      this.dias[indexDay].horas.forEach((item, i) => {
        if (item.hora == hora) {
          foundHour = true;
          indexHour = i;
        }
      });
    }

    if (foundHour) {
      this.dias[indexDay].horas[indexHour].cantidad += 1;
    } else {
      this.dias[indexDay].horas.push({ hora, cantidad: 1 });
    }
  }

}
