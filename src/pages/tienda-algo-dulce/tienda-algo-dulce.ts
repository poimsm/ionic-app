import { Component, ViewChild } from '@angular/core';
import { IonicPage, Select, NavController, NavParams, ToastController, Platform, AlertController, ModalController, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { TiendaGaleriaPage } from '../tienda-galeria/tienda-galeria';
import { DataProvider } from '../../providers/data/data';
import { TiendaProductoPage } from '../tienda-producto/tienda-producto';
import { TiendaHorarioPage } from '../tienda-horario/tienda-horario';
import { GaleriaImagenPage } from '../galeria-imagen/galeria-imagen';
import { TiendaEnviosDeliveryPage } from '../tienda-envios-delivery/tienda-envios-delivery';
import { TiendaAlgoDulceNuevoPage } from '../tienda-algo-dulce-nuevo/tienda-algo-dulce-nuevo';
import { TiendaAlgoDulceProductosPage } from '../tienda-algo-dulce-productos/tienda-algo-dulce-productos';
import { LocalizacionProvider } from '../../providers/localizacion/localizacion';


@IonicPage()
@Component({
  selector: 'page-tienda-algo-dulce',
  templateUrl: 'tienda-algo-dulce.html',
})
export class TiendaAlgoDulcePage {

  @ViewChild('ciudadRef') ciudadRef: Select;


  producto = TiendaProductoPage;
  tiendaID: string;
  tienda: any;
  imagenPerfil: string;
  ciudades = [];

  constructor(
    public toastCtrl: ToastController,
    private camera: Camera,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    private platform: Platform,
    public navParams: NavParams,
    private _data: DataProvider,
    private actionSheetCtrl: ActionSheetController,
    private _localidazacion: LocalizacionProvider
  ) {
    this.tiendaID = this.navParams.get('id');
    this.ciudades = this._localidazacion.ciudades;
  }

  ionViewDidEnter() {
    this.cargarTienda();
  }

  cargarTienda() {
    this._data.fetchTienda(this.tiendaID)
      .then(data => this.tienda = data);
  }

  openModal(tipo) {
    const modal = this.modalCtrl.create(GaleriaImagenPage, { tipo });
    modal.onDidDismiss(data => {
    });
    modal.present();
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
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
      targetWidth: 1000,
      targetHeight: 1000,
      saveToPhotoAlbum: false
    };

    if (this.platform.is('cordova')) {
      this.camera.getPicture(options).then((imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;

        const body = {
          img: base64Image,
          id: this.tiendaID
        }
        this._data.nuevaImgPerfil(body)
          .then(() => this.cargarTienda());

      }, (err) => { console.log('ERROR') });
    } else {
      const img = "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";

      const body = {
        img: 'data:image/png;base64,' + img,
        id: this.tiendaID
      }
      this._data.nuevaImgPerfil(body)
        .then(data => this.cargarTienda());
    }
  }

  openGaleria() {
    this.navCtrl.push(TiendaGaleriaPage, {
      galeria: this.tienda.galeria,
      id: this.tiendaID
    })
  }

  openSelect(tipo) {
    if (tipo == 'ciudad') {
      this.ciudadRef.open();
    }
  }

  openEntregas() {
    this.navCtrl.push(TiendaEnviosDeliveryPage, {
      ciudad: this.tienda.ciudad,
      id: this.tiendaID,
      envios: this.tienda.envios
    });
  }

  openPage(pagina) {
    this.navCtrl.push(pagina, { tipo: this.tienda.tipo, tiendaID: this.tiendaID });
  }

  openNuevoProducto() {
    if (this.tienda.imagenPerfil && this.tienda.nombre && this.tienda.direccion && this.tienda.telefono && this.tienda.ciudad) {
      if (this.tienda.envios.isActive) {
        this.navCtrl.push(TiendaAlgoDulceNuevoPage, {
          tipo: this.tienda.tipo,
          tiendaID: this.tiendaID,
          ciudad: this.tienda.ciudad
        });
      } else {
        this.middleToast('Por favor definir envíos');
      }
    } else {
      this.middleToast('Por favor completar información de perfil');
    }
  }

  middleToast(frase) {
    let toast = this.toastCtrl.create({
      message: frase,
      duration: 2500,
      position: 'middle'
    });
    toast.present();
  }

  openMisProductos() {
    this.navCtrl.push(TiendaAlgoDulceProductosPage, {
      tiendaID: this.tiendaID,
      promocion: this.tienda.promocion
    });
  }

  openHorario() {
    this.navCtrl.push(TiendaHorarioPage);
  }

  faltaCompletarToast() {
    let toast = this.toastCtrl.create({
      message: `Por favor completar Nombre y Logo`,
      duration: 2500,
      position: 'middle'
    });
    toast.present();
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
      inputType = 'text';
    }

    if (tipo == 'direccion') {
      titulo = 'Ingrese dirección de su tienda';
      inputType = 'text';
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
            let body = {};
            if (tipo == 'nombre') {
              body = { nombre: data.nombre };
            }
            if (tipo == 'telefono') {
              body = { telefono: data.telefono };
            }
            if (tipo == 'direccion') {
              body = { direccion: data.direccion };
            }
            this._data.updateTienda(this.tiendaID, body)
              .then(() => this.cargarTienda());
          }
        }
      ]
    });
    alert.present();
  }

}
