import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController, Select, ActionSheetController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { PopupsProvider } from '../../providers/popups/popups';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageProvider } from '../../providers/image/image';
import { TiendaComidaListasPage } from '../tienda-comida-listas/tienda-comida-listas';


@IonicPage()
@Component({
  selector: 'page-tienda-comida-nuevo',
  templateUrl: 'tienda-comida-nuevo.html',
})
export class TiendaComidaNuevoPage {

  @ViewChild('tiempoDeEntregaRef') tiempoDeEntregaRef: Select;
  @ViewChild('categoriaRef') categoriaRef: Select;
  @ViewChild('variacionRef') variacionRef: Select;
  @ViewChild('personasRef') personasRef: Select;
  @ViewChild('unidadesRef') unidadesRef: Select;


  categoria: string;
  titulo: string;
  descripcion: string;

  flat = true;
  personas = false;
  unidades = false;
  variable = false;
  flatPrice: number;

  imagenes = [];
  unidadesArray = [];
  personasArray = [];
  aderezos = [];
  opciones = [];

  numeroDePersonas = 'Personas';
  numeroDeUnidades = 'Unidades';

  tiempoDeEntrega: string;
  tipo: string;
  tiendaID: string;
  ciudad: string;
  categorias = [];

  listas = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private _data: DataProvider,
    private _popups: PopupsProvider,
    private actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private _img: ImageProvider,
    public modalCtrl: ModalController
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
    categoriasObj = this._popups.categoriasComida;
    Object.keys(categoriasObj).forEach(key => {
      this.categorias.push(categoriasObj[key]);
    });
  }

  openModalLista(tipo) {
    const modal = this.modalCtrl.create(TiendaComidaListasPage, { tipo });
    modal.onDidDismiss(data => {
      if (data.ok) {
        this.listas.push(data);
      }
    });
    modal.present();
  }

  rmLista(i) {
    this.listas.splice(i, 1);
  }

  add(item, tipo) {
    if (!item) {
      return
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


  openSelect(tipo) {
    if (tipo == 'categoria') {
      this.categoriaRef.open();
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
    this.add({ value: precio, tag: persona }, 'personas');
  }

  addUnidades(precio, unidad) {
    if (!precio) {
      return
    }
    if (!unidad) {
      return
    }
    this.add({ value: precio, tag: unidad }, 'unidades');
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
      listas: this.listas
    }

    if (this.flat) {
      producto.precio = {
        isActive: true,
        value: this.flatPrice
      }
    }

    if (this.unidades) {
      producto.unidades = {
        isActive: true,
        array: this.unidadesArray
      }
    }

    if (this.personas) {
      producto.cantidad = {
        isActive: true,
        array: this.personasArray
      }
    }

    console.log(producto);

    this._data.crearProductoComida(producto);
    setTimeout(() => {
      this.navCtrl.pop();
    }, 100);
  }

}

