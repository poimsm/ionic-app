import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Select, ActionSheetController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { PopupsProvider } from '../../providers/popups/popups';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageProvider } from '../../providers/image/image';

@IonicPage()
@Component({
  selector: 'page-tienda-algo-dulce-nuevo',
  templateUrl: 'tienda-algo-dulce-nuevo.html',
})
export class TiendaAlgoDulceNuevoPage {

  @ViewChild('tiempoDeEntregaRef') tiempoDeEntregaRef: Select;
  @ViewChild('categoriaRef') categoriaRef: Select;
  @ViewChild('variacionRef') variacionRef: Select;
  @ViewChild('personasRef') personasRef: Select;
  @ViewChild('unidadesRef') unidadesRef: Select;


  categoria: string;
  titulo: string;
  descripcion: string;

  isVariacion = false;
  flat = true;
  personas = false;
  unidades = false;
  variable = false;

  EjVariacion: string;
  flatPrice: number;

  variaciones = [];
  imagenes = [];
  unidadesArray = [];
  personasArray = [];

  numeroDePersonas = 'Seleccionar';
  numeroDeUnidades = 'Seleccionar';

  tiempoDeEntrega: string;
  variacion: string;

  tipo: string;
  tiendaID: string;
  categorias = [];
  ciudad: string;

  constructor(
    public navCtrl: NavController,
    private camera: Camera,
    public navParams: NavParams,
    private platform: Platform,
    private _data: DataProvider,
    private _popups: PopupsProvider,
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
    categoriasObj = this._popups.categoriasOnce;
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
    if (tipo == 'personas') {
      this.personasArray.push(item)
    }
    if (tipo == 'unidades') {
      this.unidadesArray.push(item)
    }
    if (tipo == 'imagen') {
      this.imagenes.push(item)
    }
  }

  remove(index, tipo) {
    if (tipo == 'variacion') {
      this.variaciones.splice(index, 1);
    }
    if (tipo == 'personas') {
      this.personasArray.splice(index, 1);
    }
    if (tipo == 'unidades') {
      this.unidadesArray.splice(index, 1);
    }
    if (tipo == 'imagen') {
      this.imagenes.splice(index, 1);
    }
  }



  onVaracionChange(event: any) {
    if (event == 'Color') {
      this.EjVariacion = 'Ej. Pastel rosado'
    }
    if (event == 'Sabor') {
      this.EjVariacion = 'Ej. Limón'
    }
    if (event == 'Fruta') {
      this.EjVariacion = 'Ej. Naranja'
    }
    if (event == 'Ocación') {
      this.EjVariacion = 'Ej. Cumpleaños'
    }
    if (event == 'Variedad') {
      this.EjVariacion = 'Ej. Libre de azucar'
    }
  }

  openSelect(tipo) {
    if (tipo == 'categoria') {
      this.categoriaRef.open();
    }
    if (tipo == 'tiempoDeEntrega') {
      this.tiempoDeEntregaRef.open();
    }
    if (tipo == 'variacion') {
      this.variacionRef.open();
    }
    if (tipo == 'personas') {
      this.personasRef.open();
    }
    if (tipo == 'unidades') {
      this.unidadesRef.open();
    }
  }

  addPersonas(precio, persona) {
    if (!precio) {
      return
    }
    if (!persona) {
      return
    }
    this.add({ precio, persona }, 'personas');
  }

  addUnidades(precio, unidad) {
    if (!precio) {
      return
    }
    if (!unidad) {
      return
    }
    this.add({ precio, unidad }, 'unidades');
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
      tiempoDeEntrega: this.tiempoDeEntrega,
      tienda: this.tiendaID,
      ciudad: this.ciudad
    }

    if (this.isVariacion) {
      producto.variaciones = {
        isActive: true,
        tipo: this.variacion,
        array: this.variaciones
      }
    }

    if (this.flat) {
      producto.precio = {
        tipo: 'flat',
        value: this.flatPrice
      }
    }
    if (this.unidades) {
      producto.precio = {
        tipo: 'unidad',
        array: this.unidadesArray
      }
    }

    if (this.personas) {
      producto.precio = {
        tipo: 'persona',
        array: this.personasArray
      }
    }
    this._data.crearProductoOnce(producto);
    setTimeout(() => {
      this.navCtrl.pop();
    }, 100);
  }

}
