import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform, ActionSheetController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageProvider } from '../../../providers/image/image';
import { DataProvider } from '../../../providers/data/data';
import { AuthProvider } from '../../../providers/auth/auth';

import { Content } from 'ionic-angular';
import { ControlProvider } from '../../../providers/control/control';


@IonicPage()
@Component({
  selector: 'page-formulario-start',
  templateUrl: 'formulario-start.html',
})
export class FormularioStartPage {
  @ViewChild('pageTop') pageTop: Content;

  nombre = '';
  telefono = '';
  direccion = '';
  eslogan = '';
  logo: object;
  tiendaID: string;
  token: string;

  isTarjeta = true;

  comenzoElFormulario = false;

  dias = [];
  steps = [];
  step: string;
  indexStep = 0;

  servicios = [
    {
      isActive: false,
      nombreCorto: 'Estacionamiento Privado',
      nombre: 'Estacionamiento privado'
    },
    {
      isActive: false,
      nombreCorto: 'Estacionamiento para bicicletas',
      nombre: 'Estacionamiento para bicicletas'
    },
    {
      isActive: false,
      nombreCorto: 'Wi-Fi Gratis',
      nombre: 'Conexión Wi-Fi gratis'
    },
    {
      isActive: false,
      nombreCorto: 'Estación de carga para móviles',
      nombre: 'Estación de carga para móviles'
    },
    {
      isActive: false,
      nombreCorto: 'Sala de Espera',
      nombre: 'Sala de espera'
    },
    {
      isActive: false,
      nombreCorto: 'Baño',
      nombre: 'Baño'
    },
    {
      isActive: false,
      nombreCorto: 'Puedes entrar con mascotas',
      nombre: 'Pet Friendly: puedes entrar con la mascota a la tienda'
    },
    {
      isActive: false,
      nombreCorto: 'Zona para fumadores',
      nombre: 'Zona para fumadores'
    },
    {
      isActive: false,
      nombreCorto: 'Televisión',
      nombre: 'Televisión'
    },
    {
      isActive: false,
      nombreCorto: 'Revistas Para Leer',
      nombre: 'Revistas para leer mientras esperas'
    },
    {
      isActive: false,
      nombreCorto: 'Café disponible',
      nombre: 'Café disponible mientras esperas'
    },
    {
      isActive: false,
      nombreCorto: 'Agua disponible',
      nombre: 'Agua disponible mientras esperas'
    }
  ];

  secciones = [
    {
      seccion: 'Belleza',
      categorias: [
        {
          nombre: 'Rostro',
          nombreCorto: 'Rostro',
          isActive: false
        },
        {
          nombre: 'Piel',
          nombreCorto: 'Rostro',
          isActive: false
        },
        {
          nombre: 'Uñas',
          nombreCorto: 'Rostro',
          isActive: false
        },
        {
          nombre: 'Cabello',
          nombreCorto: 'Rostro',
          isActive: false
        },
      ]
    },
    {
      seccion: 'Estilo',
      categorias: [
        {
          nombre: 'Corte de cabello',
          nombreCorto: 'Rostro',
          isActive: false
        },
        {
          nombre: 'Tatuajes',
          nombreCorto: 'Rostro',
          isActive: false
        },
        {
          nombre: 'Barbería',
          nombreCorto: 'Rostro',
          isActive: false
        },
        {
          nombre: 'Perforaciones',
          nombreCorto: 'Rostro',
          isActive: false
        },
      ]
    }
  ];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private platform: Platform,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    private _img: ImageProvider,
    private _data: DataProvider,
    public toastCtrl: ToastController,
    private _control: ControlProvider
  ) {
    this.tiendaID = this.navParams.get('tiendaID');
    this.token = this.navParams.get('token');
    this.crearSteps();
  }

  seleccionarCategoria(index) {
    this.secciones.forEach(element => {
      
    });
  }

  crearSteps() {
    for (let i = 0; i <= 2; i++) {
      this.steps.push({
        step: i + 1,
        isActive: false
      })
    }
    this.steps[0].isActive = true;
    this.step = `1/3`;
  }

  changeStep(action) {

    if (this.indexStep == 0 && action == 'back') {
      this.comenzoElFormulario = false;
      return;
    }

    this.steps[this.indexStep].isActive = false;

    if (action == 'back') {
      this.indexStep -= 1;
    } else {
      this.indexStep += 1;
    }

    this.steps[this.indexStep].isActive = true;
    this.step = `${this.indexStep + 1}/3`;
  }

  close(crearTienda) {
    if (crearTienda) {
      const servActivos = [];
      this.servicios.forEach(item => {
        if (item.isActive) {
          servActivos.push(item.nombreCorto);
        }
      });
      const data = {
        nombre: this.nombre,
        direccion: this.direccion,
        telefono: this.telefono,
        isTarjeta: this.isTarjeta,
        servicios: servActivos,
        logo: this.logo,
        horario: this.dias,
        isFirstLoggin: false
      };
      this._data.updateTienda_Mascota(this.tiendaID, data)
        .then(() => {
          this.viewCtrl.dismiss({ ok: true });
        });
    } else {
      this.viewCtrl.dismiss({ ok: false });
    }
  }

  pasoActual() {
    let step: number;
    this.steps.forEach((stepNow, i) => {
      if (stepNow.isActive) {
        step = i + 1;
      }
    });
    return step;
  }

  next() {

    let allGood = false;

    let step = this.pasoActual();

    if (step == 1) {

      if (this.nombre.length > 3 && this.telefono.length > 5 && this.direccion.length > 6) {
        allGood = true;
      }

    } else if (step == 2) {

      let servicios_listo = this.revisarServicios();

      if (servicios_listo) {
        this.close(true);
      } else {
        this.completarToast();
      }

    } else if (step == 3) {

      let horario_listo = this._control.revisarFormularioHorario();

      if (horario_listo) {
        this.close(true);
      } else {
        this.completarToast();
      }
    }

    if (allGood) {
      this.pageTop.scrollToTop();
      this.changeStep('next');
    } else {
      this.completarToast();
    }
  }

  addService(index) {
    if (this.servicios[index].isActive) {
      this.servicios[index].isActive = false;
    } else {
      this.servicios[index].isActive = true;
    }
  }

  revisarServicios() {
    let agrego_un_servicio_al_menos = false;
    this.servicios.forEach(servicio => {
      if (servicio.isActive) {
        agrego_un_servicio_al_menos = true;
      }
    });
    return agrego_un_servicio_al_menos;
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

  completarToast() {
    let toast = this.toastCtrl.create({
      message: 'Favor completar datos',
      duration: 2500,
      position: 'middle'
    });
    toast.present();
  }

}
