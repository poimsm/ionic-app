import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, ActionSheetController, ModalController, LoadingController } from 'ionic-angular';
import { TiendaMascotasVentasPage } from '../tienda-mascotas-ventas/tienda-mascotas-ventas';
import { TiendaMascotasProductosPage } from '../tienda-mascotas-productos/tienda-mascotas-productos';
import { TiendaMascotasNuevoPage } from '../tienda-mascotas-nuevo/tienda-mascotas-nuevo';
import { TiendaMascotasCodigoPage } from '../tienda-mascotas-codigo/tienda-mascotas-codigo';
import { TiendaMascotasCuponPage } from '../tienda-mascotas-cupon/tienda-mascotas-cupon';
import { TiendaMascotasPaquetePage } from '../tienda-mascotas-paquete/tienda-mascotas-paquete';
import { TiendaMascotasAgendaPage } from '../tienda-mascotas-agenda/tienda-mascotas-agenda';
import { TiendaMascotasDatosPage } from '../tienda-mascotas-datos/tienda-mascotas-datos';
import { TiendaMascotasInfoPage } from '../tienda-mascotas-info/tienda-mascotas-info';
import { TiendaMascotasStartPage } from '../tienda-mascotas-start/tienda-mascotas-start';
import { MascotasProvider } from '../../../providers/mascotas/mascotas';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageProvider } from '../../../providers/image/image';


@IonicPage()
@Component({
  selector: 'page-tienda-mascotas',
  templateUrl: 'tienda-mascotas.html',
})
export class TiendaMascotasPage {

  misVentas = TiendaMascotasVentasPage;
  misProductos = TiendaMascotasProductosPage;
  nuevoProducto = TiendaMascotasNuevoPage;
  codigo = TiendaMascotasCodigoPage;
  agenda = TiendaMascotasAgendaPage;
  datos = TiendaMascotasDatosPage;
  // data: any;
  tiendaID: string;
  tienda: any;
  hoy: any;
  horario: string;
  logo: object;

  tresImgs = [];

  loadingData = true;

  indexTresImg = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    private _mascota: MascotasProvider,
    private platform: Platform,
    private _img: ImageProvider,
    private camera: Camera,
    public loadingCtrl: LoadingController
  ) {
    this.tiendaID = this.navParams.get('tiendaID');
  }

  ionViewDidEnter() {
    this.loadTienda();
  } 

  presentLoadingDefault() {
    
  }

  loadTienda() {

    let loading = this.loadingCtrl.create({
      content: 'Porfavor espere...'
    });
  
    loading.present(); 

    this._mascota.getOneTienda(this.tiendaID)
      .then((data: any) => {

        loading.dismiss();

        this.tienda = data;
        this.tresImgs = data.tresImgs;

        this.displayHorario(this.tienda.horario);
      });
  }

  displayHorario(horario) {
    this._mascota.getToday()
      .then((data: any) => {       
        
        horario.forEach(dia => {
          if (dia.dia == data.today) {
            
            if (dia.cerrado) {
              this.horario = 'Hoy cerrado'
            } else {
              this.horario = `${dia.inicio} - ${dia.cierre}`;
            }
          }
        });        
      });
  }

  nuevoActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Seleccione tipo",
      buttons: [
        {
          text: "Cupón",
          handler: () => {
            this.navCtrl.push(TiendaMascotasCuponPage, { tiendaID: this.tiendaID });
          }
        },
        // {
        //   text: "Paquete",
        //   handler: () => {
        //     this.navCtrl.push(TiendaMascotasPaquetePage, { tiendaID: this.tiendaID });
        //   }
        // },
        {
          text: "Cancelar",
          role: "cancel"
        }
      ]
    });
    actionSheet.present();
  }

  openPage(page) {
    this.navCtrl.push(page, { tiendaID: this.tiendaID })
  }

  openProductos() {
    this.navCtrl.push(TiendaMascotasProductosPage, {
      tiendaID: this.tiendaID,
      tienda: this.tienda
    });
  }

  openAgenda() {
    this.navCtrl.push(TiendaMascotasAgendaPage, { tiendaID: this.tiendaID });
  }

  openCodigo() {
    this.navCtrl.push(TiendaMascotasCodigoPage, { tiendaID: this.tiendaID });
  }

  openModal(tipo) {
    const modal = this.modalCtrl.create(TiendaMascotasInfoPage, { tipo });
    modal.onDidDismiss(() => {
    });
    modal.present();
  }

  openModalStart() {
    const modal = this.modalCtrl.create(TiendaMascotasStartPage);
    modal.onDidDismiss(res => {
      if (res.ok) {

      } else {
        this.navCtrl.pop();
      }
    });
    modal.present();
  }

  presentActionSheet(index) {

    this.indexTresImg = index;

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

            // this.tresImgs.push(JSON.parse(data.response));
            this.agregarTresImgs(JSON.parse(data.response))
          });
      }, (err) => { console.log('ERROR') });
    } else {
      const img = "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
      // this.logo = ('data:image/png;base64,' + img);
    }
  }

  agregarTresImgs(data) {

    this.tresImgs[this.indexTresImg].img = data.img;
    this.tresImgs[this.indexTresImg].isActive = true;

    let todasLasImgsActivas = true;

    this.tresImgs.forEach(img => {
      if (!img.isActive) {
        todasLasImgsActivas = false;
      }
    });

    const updateTiendaData = {
      tresImgs: this.tresImgs,
      isActive: todasLasImgsActivas
    }

    this._mascota.updateTienda(this.tiendaID, updateTiendaData)
      .then(() => this.loadTienda());
  }


}
