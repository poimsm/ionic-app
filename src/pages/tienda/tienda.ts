import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, ModalController } from 'ionic-angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

import { TiendaGaleriaPage } from '../tienda-galeria/tienda-galeria';
import { DataProvider } from '../../providers/data/data';
import { TiendaNuevoPage } from '../tienda-nuevo/tienda-nuevo';
import { TiendaProductoPage } from '../tienda-producto/tienda-producto';
import { TiendaHorarioPage } from '../tienda-horario/tienda-horario';
import { GaleriaImagenPage } from '../galeria-imagen/galeria-imagen';

@IonicPage()
@Component({
  selector: 'page-tienda',
  templateUrl: 'tienda.html',
})
export class TiendaPage {

  nuevo = TiendaNuevoPage;
  producto = TiendaProductoPage;
  tiendaID: string;
  tienda: any;
  imagenPerfil: string;

  constructor(
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    private imagePicker: ImagePicker,
    private platform: Platform,
    public navParams: NavParams,
    private _data: DataProvider
  ) {
    this.tiendaID = this.navParams.get('id');
  }

  ionViewDidLoad() {
    this._data.fetchTienda(this.tiendaID)
      .then(data => {
      this.tienda = data; console.log(data);
      });
  }

  openModal(tipo) {
    const modal = this.modalCtrl.create(GaleriaImagenPage, { tipo });
    modal.onDidDismiss(data => {
    });
    modal.present();
  }

  seleccionar_foto() {

    if (this.platform.is('cordova')) {
      const options: ImagePickerOptions = {
        quality: 70,
        outputType: 0,
        maximumImagesCount: 1
      }
      this.imagePicker.getPictures(options).then((results) => {
        for (var i = 0; i < results.length; i++) {
          this.imagenPerfil = 'data:image/jpeg;base64,' + results[i];
          const body = {
            img: this.imagenPerfil,
            id: this.tiendaID
          }
          this._data.nuevaImgPerfil(body)
            .then(() => console.log('listoo'));
        }
      }, (err) => { console.log('ERROR') });
    } else {
      const body = {
        img: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
        id: this.tiendaID
      }
      this._data.nuevaImgPerfil(body)
        .then(data => console.log(data));
    }
  }

  openGaleria() {
    this.navCtrl.push(TiendaGaleriaPage, {
      galeria: this.tienda.galeria,
      id: this.tiendaID
    })
  }

  openPage(pagina) {
    this.navCtrl.push(pagina, { tipo: this.tienda.tipo, tiendaID: this.tiendaID });
  }

  openHorario() {
    this.navCtrl.push(TiendaHorarioPage);
  }

  presentPrompt(tipo) {

    let titulo = '';
    let inputType = '';
    if (tipo == 'nombre') {
      titulo = '¿Nombre de tu tienda?';
      inputType = 'text';
    }

    if (tipo == 'telefono') {
      titulo = '¿Teléfono de contacto?';
      inputType = 'tel';
    }

    let alert = this.alertCtrl.create({
      title: titulo,
      inputs: [
        {
          type: inputType,
          name: tipo,
          placeholder: 'Escribir'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            if (tipo == 'nombre') {
              const body = { nombre: data.nombre };
              this._data.editTienda(this.tiendaID, body)
                .then((data: any) => this.tienda = data);
            }
            if (tipo == 'telefono') {
              const body = { telefono: data.telefono };
              this._data.editTienda(this.tiendaID, body)
                .then((data: any) => this.tienda = data);
            }
          }
        }
      ]
    });
    alert.present();
  }

}
