import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IntroduccionPage } from '../introduccion/introduccion';

@IonicPage()
@Component({
  selector: 'page-oferta',
  templateUrl: 'oferta.html',
})
export class OfertaPage {

  tipo:string;
  data: object;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // this.tipo = this.navParams.get('tipo');
    
  }


  setData() {
    if (this.tipo == 'mascotas') {
      this.data = {
        tienda: {
          img: '',
          nombre: 'Clínica dogcats'
        },
        incluye: [
          'Lavado de autos',
          'Lavado de autos',
        ],
        descripcion: {
          
        }
      }
    }
  }

  openIntro() {
    this.navCtrl.push(IntroduccionPage);
  }
  

}



