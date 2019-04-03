import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-formulario-inscripcion',
  templateUrl: 'formulario-inscripcion.html',
})
export class FormularioInscripcionPage {

  uid: string;
  ciudad: string;
  nombre: string;
  telefono: string;
  direccion: string;
  isSolicitud: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _data: DataProvider,
    public toastCtrl: ToastController,
    ) {
    this.uid = this.navParams.get('id');
    this.isSolicitud = this.navParams.get('isSolicitud');
    console.log(this.isSolicitud);
    
  }

  crear(){
    if (this.nombre && this.telefono && this.direccion && this.ciudad) {
      const body = {
        user: this.uid,
        nombre: this.nombre,
        telefono: this.telefono,
        direccion: this.direccion,
        ciudad: this.ciudad
      }
      this._data.crearSolicitud(this.uid, body)
      .then(() => {
        setTimeout(() => {
          this.solicitudCreada();
          this.navCtrl.pop();
        }, 100);
      });
    } else {
      this.faltaCompletar();
    }  
  }

  solicitudCreada() {
    let toast = this.toastCtrl.create({
      message: 'Solicitud creada con exito',
      duration: 2500,
      position: 'bottom'
    });
    toast.present();
  }

  faltaCompletar() {
    let toast = this.toastCtrl.create({
      message: 'Favor completar toda la información',
      duration: 2500,
      position: 'middle'
    });
    toast.present();
  }

}

