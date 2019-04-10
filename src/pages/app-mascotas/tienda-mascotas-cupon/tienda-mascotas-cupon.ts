import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ActionSheetController } from 'ionic-angular';
import { TiendaMascotasAgendaPage } from '../tienda-mascotas-agenda/tienda-mascotas-agenda';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageProvider } from '../../../providers/image/image';


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
  isReservas = false;
  showHour = false;

  imagenes = [];
  reservas = [];
  hora24 = '18:30';
  hora = 6;
  min = 30;
  tiempo = 'PM';

  dia: string;

  dias: any = [
    {
      dia: 'Jueves 20',
      horas: []
    },
    {
      dia: 'Viernes 21',
      horas: []
    },
    {
      dia: 'Sábado 22',
      horas: []
    },
  ];

  ejemploIncluye = 'Ejemplo: (1) Corte de uñas, (2) limpieza del canal auditivo, (3) baño, (4) masajes SPA, (5) ... etc';
  ejemploCondiciones = '  Ejemplo: (1) Este cupón se limita solo a la primera visitada a la tienda para cada nuevo gato, (2) gatos de pelo largo, gatos que pesan más de 10kg y padecen de enfermedades a la piel deben pagar $2.000 adicionales, (3)... etc..';

  incluir = [
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

  categorias = [
    'Belleza: uñas',
    'Belleza: cabello',
    'Belleza: cuerpo',
    'Belleza: piel',
    'Belleza: rostro',
    'Estilo: corte pelo mujer',
    'Estilo: corte pelo hombre',
    'Estilo: barba',
    'Estilo: tattoo',
    'Estilo: perforaciones',
  ]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    private _img: ImageProvider
  ) {
  }

  onChange(event) {
    if (event.checked) {
      // this.showHour = true;
      // this.navCtrl.push(TiendaMascotasAgendaPage);
    }
  }

  changeHora(tipo) {
    if (tipo == '+') {
      if (this.hora == 12) {
        this.hora = 0;
      } else {
        this.hora += 1;
      }
    }
    if (tipo == '-') {
      if (this.hora == 0) {
        this.hora = 12;
      } else {
        this.hora -= 1;
      }
    }
    this.actualizarHora24();
  }

  changeMin(tipo) {
    if (tipo == '+') {
      if (this.min == 45) {
        this.min = 0;
      } else {
        this.min += 15;
      }
    }
    if (tipo == '-') {
      if (this.min == 0) {
        this.min = 45;
      } else {
        this.min -= 15;
      }
    }
    this.actualizarHora24();
  }

  changeTiempo(tipo) {
    if (tipo == '+') {
      if (this.tiempo == 'PM') {
        this.tiempo = 'AM';
      } else {
        this.tiempo = 'PM';
      }
    }
    if (tipo == '-') {
      if (this.tiempo == 'PM') {
        this.tiempo = 'AM';
      } else {
        this.tiempo = 'PM';
      }
    }
    this.actualizarHora24();
  }

  actualizarHora24() {
    let hora = this.hora;
    let min = this.min.toString();
    if (this.tiempo == 'PM') {
      hora += 12;
    }
    if (this.min == 0) {
      min = '00';
    }
    this.hora24 = `${hora}:${min}`;
  }

  addIncluir() {
    const i = this.incluir.length + 1;
    this.incluir.push({
      texto: '',
      placeholder: `(${i}) Tu respuesta`
    });
  }

  openHora(dia) {
    this.dia = dia;
    this.showHour = true;
  }

  closeHora(add) {
    if (add) {
      this.addHora(this.dia);
    }
    this.showHour = false;
  }

  delHora(indexDia, indexHora) {
    this.dias[indexDia].horas.splice(indexHora,1);
  }

  addHora(dia) {

    const hora = this.hora24;
    let foundDay = false;
    let foundHour = false;
    let indexDay = 0;
    let indexHour = 0;

    this.dias.forEach((item, i) => {
      if (item.dia == dia) {
        foundDay = true;
        indexDay = i;
      }
    });

    if (this.dias[indexDay].horas.length > 0) {
      this.dias[indexDay].horas.forEach((item, i) => {
        if (item.hora == hora) {
          foundHour = true;
          indexHour = i;
        }
      });
    }    

    if (foundHour) {
      this.dias[indexDay].horas[indexHour].cantidad += 1;
    } else {
      this.dias[indexDay].horas.push({ hora, cantidad: 1 });
    }
  }

  addCondicion() {
    const i = this.condiciones.length + 1;
    this.condiciones.push({
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


}
