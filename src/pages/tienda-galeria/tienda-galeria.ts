import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController } from 'ionic-angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { DataProvider } from '../../providers/data/data';
import { GaleriaImagenPage } from '../galeria-imagen/galeria-imagen';

@IonicPage()
@Component({
  selector: 'page-tienda-galeria',
  templateUrl: 'tienda-galeria.html',
})
export class TiendaGaleriaPage {

  galeria = [];
  imagen: string;
  tiendaID: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private imagePicker: ImagePicker,
    private platform: Platform,
    private _data: DataProvider,
    public modalCtrl: ModalController
  ) {
    this.galeria = this.navParams.get('galeria');
    this.tiendaID = this.navParams.get('id');
  }

  openModal(url) {
    const modal = this.modalCtrl.create(GaleriaImagenPage, { url });
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
          this.imagen = 'data:image/jpeg;base64,' + results[i];
          const body = {
            img: this.imagen,
            id: this.tiendaID
          }
          this._data.nuevaImgGaleria(body)
            .then(() => console.log('listoo'));
        }
      }, (err) => { console.log('ERROR') });
    } else {
      const body = {
        img: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
        id: this.tiendaID
      }
      this._data.nuevaImgGaleria(body)
        .then(data => console.log(data));
    }

  }

}
