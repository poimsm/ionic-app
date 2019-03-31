import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageProvider } from '../../providers/image/image';


@IonicPage()
@Component({
  selector: 'page-tienda-mascotas-start',
  templateUrl: 'tienda-mascotas-start.html',
})
export class TiendaMascotasStartPage {

  nombre: string;
  telefono: string;
  direccion: string;
  eslogan: string;
  logo: object;
  

  step = '1/3';
  isOK = false;
  isOne = true;
  isTwo = false;
  isThree = false;
  isTarjeta = true;

  servicios = [
    {
      isActive: false,
      nombre: 'Estacionamiento privado'
    },
    {
      isActive: false,
      nombre: 'Conexión Wi-Fi gratis'
    },
    {
      isActive: false,
      nombre: 'Estación de carga para baterías de celulares'
    },
    {
      isActive: false,
      nombre: 'Sala de estar o sala de espera'
    },
    {
      isActive: false,
      nombre: 'Baño'
    },
    {
      isActive: false,
      nombre: 'Pet Friendly: puedes entrar con tu mascota a la tienda'
    },
    {
      isActive: false,
      nombre: 'Prohibido fumar'
    },
    {
      isActive: false,
      nombre: 'Admitido fumar'
    }
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private platform: Platform,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    private _img: ImageProvider
    ) {
  }

  close() {
    this.viewCtrl.dismiss();
  }

  next() {    
    if (this.isOne) {
      this.step = '2/3';    
      this.isOne = false;
      this.isTwo = true;
      this.isThree = false;      
    } else if (this.isTwo) {
      this.step = '3/3';
      this.isOne = false;
      this.isTwo = false;
      this.isThree = true;
    } else if (this.isThree) {
      this.step = '1/3';
      this.isOne = true;
      this.isTwo = false;
      this.isThree = false;
    }
  }

  addService(index) {
    if (this.servicios[index].isActive) {
      this.servicios[index].isActive = false;
    } else {
      this.servicios[index].isActive = true;
    }
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
      quality: 90,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
      targetWidth: 1000,
      targetHeight: 1000,
      saveToPhotoAlbum: false
    };

    if (this.platform.is('cordova')) {
      this.camera.getPicture(options).then((imageData) => {
        this._img.uploadImage(imageData)
          .then((data: any) => {

            this.logo = JSON.parse(data.response);
          });
      }, (err) => { console.log('ERROR') });
    } else {
      const img = "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
      // this.logo = ('data:image/png;base64,' + img);
    }
  }


}
