import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MueblesDimensionPage } from '../muebles-dimension/muebles-dimension';

@IonicPage()
@Component({
  selector: 'page-muebles-custom',
  templateUrl: 'muebles-custom.html',
})
export class MueblesCustomPage {
  cajones = '2';
  numeroCajones = 2;

  colores = [
    {
      isActive: true,
      name: 'salmon'
    },
    {
      isActive: false,
      name: 'sandybrown'
    },
    {
      isActive: false,
      name: 'saddlebrown'
    },
    {
      isActive: false,
      name: 'seagreen'
    }
  ];

  woods = [
    {
      isActive: true,
      name: 'Caoba',
      desc: 'Es una de las maderas más duras y junto con su característico color café oscuro y una mediana densidad lo hacen perfecto para muebles, gabinetes, puertas, adornos y elementos torneados.',
      img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1553287128/sdfsfre.jpg'
    },
    {
      isActive: false,
      name: 'Nogal',
      desc: ' Es una de las maderas más reconocidas y apreciadas. De color rojizo, es dura, homogénea y de gran valor decorativo. Se utiliza en muebles, ebanistería y elaboración de artículos torneados.',
      img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1553287129/fondo-textura-madera_53876-14865.jpg'
    }, {
      isActive: false,
      name: 'Pino',
      desc: 'Es la madera más utilizada hoy en día debido a su precio, calidad y dureza. Su color oscila entre el amarillo y el blanquecino roble.',
      img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1553287129/45454dfs.jpg'
    }
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openDimension() {
    this.navCtrl.push(MueblesDimensionPage);
  }

  sum(tipo) {
    if (tipo == '-' && this.numeroCajones > 1) {
      this.numeroCajones += -1;
    }
    if (tipo == '+' && this.numeroCajones < 4) {
      this.numeroCajones += 1;
    }
  }
  
  changeColor(index) {
    this.colores.forEach(color => {
      color.isActive = false;
    });
    this.colores[index].isActive = true;
  }

  changeWood(index) {
    this.woods.forEach(color => {
      color.isActive = false;
    });
    this.woods[index].isActive = true;
  }
}
