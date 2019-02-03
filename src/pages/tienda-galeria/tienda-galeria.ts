import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ActionSheetController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { GaleriaImagenPage } from '../galeria-imagen/galeria-imagen';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-tienda-galeria',
  templateUrl: 'tienda-galeria.html',
})
export class TiendaGaleriaPage {

  galeria = [];
  imagen: string;
  tiendaID: string;
  tienda: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private _data: DataProvider,
    public modalCtrl: ModalController,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController
  ) {
    this.galeria = this.navParams.get('galeria');
    this.tiendaID = this.navParams.get('id');
  }

  openModal(url) {
    const modal = this.modalCtrl.create(GaleriaImagenPage, { url });
    modal.present();
  }

  cargarTienda() {
    this._data.fetchTienda(this.tiendaID)
      .then(data => {
        this.tienda = data;
        this.galeria = this.tienda.galeria;
      });
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Cargar desde galería',
          handler: () => {
            this.tomarFoto(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Usar cámara',
          handler: () => {
            this.tomarFoto(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  tomarFoto(sourceType) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false
    };

    if (this.platform.is('cordova')) {
      this.camera.getPicture(options).then((imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;

        const body = {
          img: base64Image,
          id: this.tiendaID
        }
        this._data.nuevaImgGaleria(body)
          .then(() => this.cargarTienda());

      }, (err) => { console.log('ERROR') });
    } else {
      const img = "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";

      const body = {
        img: 'data:image/png;base64,' + img,
        id: this.tiendaID
      }
      this._data.nuevaImgGaleria(body)
        .then(() => this.cargarTienda());
    }
  }



}
