import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IntroduccionPage } from '../introduccion/introduccion';
import { ConfigProvider } from '../../../providers/config/config';
import { MaquetaProvider } from '../../../providers/maqueta/maqueta';
import { MascotasReservasPage } from '../mascotas-reservas/mascotas-reservas';

@IonicPage()
@Component({
  selector: 'page-mascotas-oferta',
  templateUrl: 'mascotas-oferta.html',
})
export class MascotasOfertaPage {

  tipo: string;
  from: string;
  data: object;
  payload: object;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _config: ConfigProvider,
    public _maqueta: MaquetaProvider
  ) {
    this.tipo = this.navParams.get('tipo');
    this.payload = this.navParams.get('payload');
    this.from = this.navParams.get('from');

    this.setData();
  }

  setData() {
    if (this.tipo === 'mascotas' && this._config.MAQUETA) {
      this.data = this._maqueta.crearCuponMascotas();
    }
    if (this.from === 'tienda-mascotas') {
      console.log(this.payload);
      this.data = this.payload;
    }
  }

  openReservas(cuponID, semana) {
    this.navCtrl.push(MascotasReservasPage, { cuponID, semana });
  }


  openIntro() {
    this.navCtrl.push(IntroduccionPage);
  }


}




