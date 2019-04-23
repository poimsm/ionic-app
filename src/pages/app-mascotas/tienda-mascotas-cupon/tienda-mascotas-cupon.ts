import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ActionSheetController, ToastController, ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageProvider } from '../../../providers/image/image';
import { MascotasProvider } from '../../../providers/mascotas/mascotas';
import { TiendaMascotasAgendaPage } from '../tienda-mascotas-agenda/tienda-mascotas-agenda';
import { SemanaProvider } from '../../../providers/semana/semana';


@IonicPage()
@Component({
  selector: 'page-tienda-mascotas-cupon',
  templateUrl: 'tienda-mascotas-cupon.html',
})
export class TiendaMascotasCuponPage {

  titulo: string;
  descripcion: string;
  precioNormal: string;
  precioOferta: string;
  isReserva = false;
  showHour = false;
  allGood = true;

  imagenes = [];
  reservas = [];

  dias = [];

  showIncluye = false;
  showCondiciones = false;


  ejemploIncluye = 'Ejemplo: (1) Corte de uñas, (2) limpieza del canal auditivo, (3) baño, (4) masajes SPA, (5) ... etc';
  ejemploCondiciones = '  Ejemplo: (1) Este cupón se limita solo a la primera visitada a la tienda para cada nuevo gato, (2) gatos de pelo largo, gatos que pesan más de 10kg y padecen de enfermedades a la piel deben pagar $2.000 adicionales, (3)... etc..';

  incluye = [
    {
      texto: '',
      placeholder: `(1) Tu respuesta`
    }
  ];

  condiciones = [
    {
      texto: '',
      placeholder: `(1) Tu respuesta`
    }
  ];

  incluye_OK = [];
  condiciones_OK = [];
  semana_OK = [];

  categorias = [
    'Estilo',
    'Belleza'
  ];

  subBelleza = [
    'Uñas',
    'Cabello',
    'Cuerpo',
    'Piel',
    'Rostro'
  ];

  subEstilo = [
    'Corte pelo mujer',
    'Corte pelo hombre',
    'Barba',
    'Tattoo',
    'Perforaciones',
  ];

  subcategoria: string;
  categoria: string;

  tiendaID: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    private _img: ImageProvider,
    private _mascotas: MascotasProvider,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private _semana: SemanaProvider
  ) {    

    this.tiendaID = this.navParams.get('tiendaID');
    _mascotas.getTresDias().then((data: any) => {
      this.dias.forEach((item, i) => {
        item.dia = data[i].dia;
        item.fecha = data[i].fecha;
      });
    });
  }

  onChange(event) {
    event.checked ? this.presentSemana(): console.log('s');    
  }

  presentSemana() {    
    const modal = this.modalCtrl.create(TiendaMascotasAgendaPage);
    modal.present();
  }  

  addCondicion() {
    const i = this.condiciones.length + 1;
    this.condiciones.push({
      texto: '',
      placeholder: `(${i}) Tu respuesta`
    });
  }

  addIncluir() {
    const i = this.incluye.length + 1;
    this.incluye.push({
      texto: '',
      placeholder: `(${i}) Tu respuesta`
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

  faltaCompletar() {
    let toast = this.toastCtrl.create({
      message: 'Favor completar datos',
      duration: 2500,
      position: 'middle'
    });
    toast.present();
  }
  // || this.imagenes.length == 0
  validarFormulario() {    
    this.allGood = true;
    if (!(this.titulo && this.descripcion && this.categoria && this.precioNormal && this.precioOferta)) {
      this.faltaCompletar();
      this.allGood = false;
    }
    if (!(this.incluye.length > 1 && this.condiciones.length > 1)) {
      this.faltaCompletar();
      this.allGood = false;
    }
  }

  prepararDatos() {

    this.incluye.forEach((item,i) => {
      this.incluye_OK[i] = item.texto;
    });

    this.condiciones.forEach((item,i) => {
      this.condiciones_OK[i] = item.texto;
    });

    
  }

  save() {

    this.validarFormulario();

    if (this.allGood) {

      this.prepararDatos();
      
      let porcentaje = Math.ceil((Number(this.precioNormal)-Number(this.precioOferta))/Number(this.precioNormal)*100);

      const data: any = {
        tienda: this.tiendaID,
        titulo: this.titulo,
        descripcion: this.descripcion,
        categoria: this.subcategoria,
        imgs: this.imagenes,
        precio: {
          normal: this.precioNormal,
          oferta: this.precioOferta,
          descuento: porcentaje
        },
        semana: this._semana.obtener_semana(),
        incluye: this.incluye_OK,
        notas: this.condiciones_OK
      }

      if (this.isReserva) {
        data.isReserva = true;
      }

      this._mascotas.crearCupon(this.tiendaID, data, this.isReserva, this.dias);
              
    }
  }

}
