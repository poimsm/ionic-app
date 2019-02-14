import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Select, ActionSheetController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { PopupsProvider } from '../../providers/popups/popups';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageProvider } from '../../providers/image/image';

@IonicPage()
@Component({
  selector: 'page-tienda-ecommerce-nuevo',
  templateUrl: 'tienda-ecommerce-nuevo.html',
})
export class TiendaEcommerceNuevoPage {

  @ViewChild('tiempoDeEntregaRef') tiempoDeEntregaRef: Select;
  @ViewChild('categoriaRef') categoriaRef: Select;
  @ViewChild('variacionRef') variacionRef: Select;


  categoria: string;
  titulo: string;
  descripcion: string;

  EjVariacion: string;
  variacion: string;

  isVariacion = false;
  imagenes = [];
  variaciones = [];

  valorProducto: number;
  costoEnvio: number;

  tiempoDeEntrega: string;
  tipo: string;
  tiendaID: string;
  ciudad: string;
  addFirst = true;
  addMore = false;
  categorias = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private _data: DataProvider,
    private _popups: PopupsProvider,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    private _img: ImageProvider
  ) {
    this.tipo = this.navParams.get('tipo');
    this.tiendaID = this.navParams.get('tiendaID');
    this.ciudad = this.navParams.get('ciudad');
  }

  ionViewDidLoad() {
    this.setUp();
  }

  setUp() {
    let categoriasObj = {};
    categoriasObj = this._popups.categoriasEcommerce;
    Object.keys(categoriasObj).forEach(key => {
      this.categorias.push(categoriasObj[key]);
    });
  }

  add(item, tipo) {
    if (!item) {
      return
    }
    if (tipo == 'variacion') {
      this.variaciones.push(item)
    }
    if (tipo == 'imagen') {
      this.imagenes.push(item)
    }
  }

  addVariacion(index, item) {
    this.variaciones[index].array.push(item);
    console.log(this.variaciones);
  }

  remove(index, tipo) {
    if (tipo == 'variacion') {
      this.variaciones.splice(index, 1);
    }
    if (tipo == 'imagen') {
      this.imagenes.splice(index, 1);
    }
  }

  onVaracionChange(event: any) {
    if (event == 'Color') {
      this.EjVariacion = 'Ej. Morado'
    }
    if (event == 'Sabor') {
      this.EjVariacion = 'Ej. Limón'
    }
    if (event == 'Talla') {
      this.EjVariacion = 'Ej. L'
    }
    if (event == 'Material') {
      this.EjVariacion = 'Ej. Papel'
    }
    this.addFirst = false;
    this.addMore = true;
    const data = {
      tipo: event,
      array: []
    }
    this.variaciones.push(data);
  }


  openSelect(tipo) {
    if (tipo == 'categoria') {
      this.categoriaRef.open();
    }
    if (tipo == 'variacion') {
      this.variacionRef.open();
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

            const imagen = JSON.parse(data.response);
            this.imagenes.push(imagen);
          });
      }, (err) => { console.log('ERROR') });
    } else {
      const img = "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
      this.imagenes.push('data:image/png;base64,' + img);
    }
  }


  save() {
    const producto: any = {
      titulo: this.titulo,
      descripcion: this.descripcion,
      imgs: this.imagenes,
      categoria: this.categoria,
      tienda: this.tiendaID,
      ciudad: this.ciudad,
      precio: {
        costoEnvio: Number(this.costoEnvio),
        valorProducto: Number(this.valorProducto)
      }
    }

    if (this.isVariacion && this.variaciones.length > 0) {
      producto.variaciones = {
        isActive: true,
        data: this.variaciones
      }
    }

    console.log(producto);

    this._data.crearProductoEcommerce(producto);
    setTimeout(() => {
      this.navCtrl.pop();
    }, 100);
  }

}

