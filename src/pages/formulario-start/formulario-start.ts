import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform, ActionSheetController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageProvider } from '../../providers/image/image';
import { DataProvider } from '../../providers/data/data';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-formulario-start',
  templateUrl: 'formulario-start.html',
})
export class FormularioStartPage {

  nombre = '';
  telefono = '';
  direccion = '';
  eslogan = '';
  logo: object;
  tiendaID: string;
  token: string;

  step = '1/4';
  isOK = false;
  isOne = true;
  isTwo = false;
  isThree = false;
  isFour = false;
  isTarjeta = true;

  dias = [];

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
      nombreCorto: 'Puedes entrar con la mascota',
      nombre: 'Pet Friendly: puedes entrar con la mascota a la tienda'
    },
    {
      isActive: false,
      nombreCorto: 'Prohibido Fumar',
      nombre: 'Prohibido fumar'
    },
    {
      isActive: false,
      nombreCorto: 'Zona para fumadores',
      nombre: 'Zona para fumadores'
    },
    {
      isActive: false,
      nombreCorto: 'Revistas Para Leer',
      nombre: 'Revistas para leer mientras esperas'
    },
    {
      isActive: false,
      nombreCorto: 'Televisión',
      nombre: 'Televisión'
    }
  ];

  lunesCerrado = false;
  martesCerrado = false;
  miercolesCerrado = false;
  juevesCerrado = false;
  viernesCerrado = false;
  sabadoCerrado = false;
  domingoCerrado = false;

  lunes = true;
  martes = true;
  miercoles = true;
  jueves = true;
  viernes = true;
  sabado = true;
  domingo = true;

  lunesInicio: string;
  lunesCierre: string;
  martesInicio: string;
  martesCierre: string;
  miercolesInicio: string;
  miercolesCierre: string;
  juevesInicio: string;
  juevesCierre: string;
  viernesInicio: string;
  viernesCierre: string;
  sabadoInicio: string;
  sabadoCierre: string;
  domingoInicio: string;
  domingoCierre: string;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private platform: Platform,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    private _img: ImageProvider,
    private _data: DataProvider,
    private _auth: AuthProvider,
    public toastCtrl: ToastController
  ) {
    this.tiendaID = this.navParams.get('tiendaID');
    this.token = this.navParams.get('token');
  }
  
  close(ok) {
    if (ok) {
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
        eslogan: this.eslogan,
        imgPerfil: this.logo,
        horario: this.dias,
        isFirstLoggin: false
      };
      this._data.updateTienda(this.tiendaID, data)
        .then(() => {
          this.viewCtrl.dismiss({ ok: true });
        });
    } else {
      this.viewCtrl.dismiss({ ok: false });
    }
  }

  next() {
    if (this.isOne) {
      if (this.nombre.length > 3 && this.telefono.length > 5 && this.direccion.length > 6) {
        this.step = '2/4';
        this.isOne = false;
        this.isTwo = true;
        this.isThree = false;
        this.isFour = false;
      } else {
        this.completarToast();
      }
    } else if (this.isTwo) {
      this.step = '3/4';
      this.isOne = false;
      this.isTwo = false;
      this.isThree = true;
      this.isFour = false;
    } else if (this.isThree) {
      this.step = '4/4';
      this.isOne = false;
      this.isTwo = false;
      this.isThree = false;
      this.isFour = true;
    } else if (this.isFour) {
      this.checkHorario();
      if (
        this.lunes &&
        this.martes &&
        this.miercoles &&
        this.jueves &&
        this.viernes &&
        this.sabado &&
        this.domingo) {
        this.close(true);
      } else {
        this.completarToast();
      }
    }
  }

  addService(index) {
    if (this.servicios[index].isActive) {
      this.servicios[index].isActive = false;
    } else {
      this.servicios[index].isActive = true;
    }
  }

  checkHorario() {

    this.lunes = true;
    this.martes = true;
    this.miercoles = true;
    this.jueves = true;
    this.viernes = true;
    this.sabado = true;
    this.domingo = true;

    this.dias = [];

    if (!this.lunesCerrado) {
      if (this.lunesInicio && this.lunesCierre) {
        this.dias.push({
          nombre: 'Lunes',
          inicio: this.lunesInicio,
          cierre: this.lunesCierre,
          cerrado: false
        });
      } else {
        this.lunes = false;
      }
    } else {
      this.dias.push({
        nombre: 'Lunes',
        cerrado: true
      });
    }
    if (!this.martesCerrado) {
      if (this.martesInicio && this.martesCierre) {
        this.dias.push({
          nombre: 'Martes',
          inicio: this.martesInicio,
          cierre: this.martesCierre,
          cerrado: false
        });
      } else {
        this.martes = false;
      }
    } else {
      this.dias.push({
        nombre: 'Martes',
        cerrado: true
      });
    }
    if (!this.miercolesCerrado) {
      if (this.miercolesInicio && this.miercolesCierre) {
        this.dias.push({
          nombre: 'Miércoles',
          inicio: this.miercolesInicio,
          cierre: this.miercolesCierre,
          cerrado: false
        });
      } else {
        this.miercoles = false;
      }
    } else {
      this.dias.push({
        nombre: 'Miércoles',
        cerrado: true
      });
    }
    if (!this.juevesCerrado) {
      if (this.juevesInicio && this.juevesCierre) {
        this.dias.push({
          nombre: 'Jueves',
          inicio: this.juevesInicio,
          cierre: this.juevesCierre,
          cerrado: false
        });
      } else {
        this.jueves = false;
      }
    } else {
      this.dias.push({
        nombre: 'Jueves',
        cerrado: true
      });
    }
    if (!this.viernesCerrado) {
      if (this.viernesInicio && this.viernesCierre) {
        this.dias.push({
          nombre: 'Viernes',
          inicio: this.viernesInicio,
          cierre: this.viernesCierre,
          cerrado: false
        });
      } else {
        this.viernes = false;
      }
    } else {
      this.dias.push({
        nombre: 'Viernes',
        cerrado: true
      });
    }
    if (!this.sabadoCerrado) {
      if (this.sabadoInicio && this.sabadoCierre) {
        this.dias.push({
          nombre: 'Sábado',
          inicio: this.sabadoInicio,
          cierre: this.sabadoCierre,
          cerrado: false
        });
      } else {
        this.sabado = false;
      }
    } else {
      this.dias.push({
        nombre: 'Sábado',
        cerrado: true
      });
    }
    if (!this.domingoCerrado) {
      if (this.domingoInicio && this.domingoCierre) {
        this.dias.push({
          nombre: 'Domingo',
          inicio: this.domingoInicio,
          cierre: this.domingoCierre,
          cerrado: false
        });
      } else {
        this.domingo = false;
      }
    } else {
      this.dias.push({
        nombre: 'Domingo',
        cerrado: true
      });
    }
    console.log(this.dias);
    
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
