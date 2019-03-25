import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-mis-productos-content',
  templateUrl: 'mis-productos-content.html',
})
export class MisProductosContentPage {

  img:string;
  isAgotado = false;
  isDisponible = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.img = this.navParams.get('img');
  }

  volver() {
    setTimeout(() => {
      this.navCtrl.pop();
    }, 500);
  }

  cambiarEstado(event, tipo: number) {
    if (tipo == 1) {
      this.isAgotado = (event == true) ? false : true;
      // this.toggleBotonContinuar();
      console.log('passso 1');
      
    } else {
      this.isDisponible = (event == true) ? false : true;
      console.log('passso 2');
      // this.toggleBotonContinuar();
    }
  }

}
