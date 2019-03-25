import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Select,
  ToastController,
  Platform,
  AlertController,
  ModalController,
  ActionSheetController
} from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";

import { TiendaGaleriaPage } from "../tienda-galeria/tienda-galeria";
import { DataProvider } from "../../providers/data/data";
import { TiendaProductoPage } from "../tienda-producto/tienda-producto";
import { TiendaHorarioPage } from "../tienda-horario/tienda-horario";
import { GaleriaImagenPage } from "../galeria-imagen/galeria-imagen";
import { ImageProvider } from "../../providers/image/image";
import { TiendaEnviosDeliveryPage } from "../tienda-envios-delivery/tienda-envios-delivery";
import { TiendaEcommerceNuevoPage } from "../tienda-ecommerce-nuevo/tienda-ecommerce-nuevo";
import { TiendaEcommerceProductosPage } from "../tienda-ecommerce-productos/tienda-ecommerce-productos";
import { LocalizacionProvider } from "../../providers/localizacion/localizacion";
import { AuthProvider } from "../../providers/auth/auth";
import { MisProductosPage } from "../mis-productos/mis-productos";
import { MisVentasPage } from "../mis-ventas/mis-ventas";


@IonicPage()
@Component({
  selector: 'page-tienda-muebles',
  templateUrl: 'tienda-muebles.html',
})
export class TiendaMueblesPage {
  @ViewChild("ciudadRef") ciudadRef: Select;
  @ViewChild("tagRef") tagRef: Select;

  producto = TiendaProductoPage;
  tiendaID: string;
  tienda: any;
  imagenPerfil: string;
  ciudades = [];
  tag: string;
  tags = [
    'Servicio a domicilio',
    'Reparacion mecanica',
    'Taller mecanico'
  ]

  constructor(
    public toastCtrl: ToastController,
    private camera: Camera,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    private platform: Platform,
    public navParams: NavParams,
    private _data: DataProvider,
    private _img: ImageProvider,
    private actionSheetCtrl: ActionSheetController,
    private _localidazacion: LocalizacionProvider,
    private _auth: AuthProvider
  ) {
    // this.tiendaID = this.navParams.get("id");
    // this.ciudades = this._localidazacion.ciudades;
  }

  // ionViewDidLoad() {
  //   this.cargarTienda();
  // }

  // ionViewDidEnter() {
  //   this.cargarTienda();
  // }

  cargarTienda() {
    this._data.fetchTienda(this.tiendaID).then(data => (this.tienda = data));
  }

  openModal(tipo) {
    const modal = this.modalCtrl.create(GaleriaImagenPage, { tipo });
    modal.onDidDismiss(data => { });
    modal.present();
  }

  misProductos() {
    this.navCtrl.push(MisProductosPage);
  }

  misVentas() {
    this.navCtrl.push(MisVentasPage);
  }

  nuevoProducto() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Seleccione tipo",
      buttons: [
        {
          text: "Producto en promoción",
          handler: () => {
          }
        },
        {
          text: "Pack de productos combinados en promoción",
          handler: () => {
          }
        },
        {
          text: "Producto para mi catálogo",
          handler: () => {
          }
        },
        {
          text: "Cancelar",
          role: "cancel"
        }
      ]
    });
    actionSheet.present();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Select Image Source",
      buttons: [
        {
          text: "Cargar desde galería",
          handler: () => {
            this.tomarFoto(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: "Usar cámara",
          handler: () => {
            this.tomarFoto(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: "Cancelar",
          role: "cancel"
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
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false
    };

    if (this.platform.is("cordova")) {
      this.camera.getPicture(options).then(
        imageData => {
          let base64Image = "data:image/jpeg;base64," + imageData;

          const body = {
            img: base64Image,
            id: this.tiendaID
          };
          this._data.nuevaImgPerfil(body).then(() => this.cargarTienda());
        },
        err => {
          console.log("ERROR");
        }
      );
    } else {
      const img =
        "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";

      const body = {
        img: "data:image/png;base64," + img,
        id: this.tiendaID
      };
      this._data.nuevaImgPerfil(body).then(data => this.cargarTienda());
    }
  }

  openGaleria() {
    this.navCtrl.push(TiendaGaleriaPage, {
      galeria: this.tienda.galeria,
      id: this.tiendaID
    });
  }

  openSelect(tipo) {
    if (tipo == 'ciudad') {
      this.ciudadRef.open();
    }
    if (tipo == 'tag') {
      this.tagRef.open();
    }
  }

  openEntregas(isDefined) {
    this.navCtrl.push(TiendaEnviosDeliveryPage, {
      ciudad: this.tienda.ciudad,
      id: this.tiendaID,
      isDefined,
      envios: this.tienda.envios
    });
  }

  openNuevoProducto() {
    if (
      this.tienda.imgPerfil &&
      this.tienda.nombre &&
      this.tienda.direccion &&
      this.tienda.telefono &&
      this.tienda.ciudad
    ) {
      this.navCtrl.push(TiendaEcommerceNuevoPage, {
        tipo: this.tienda.tipo,
        tiendaID: this.tiendaID,
        ciudad: this.tienda.ciudad
      });
    } else {
      this.middleToast("Por favor completar información de perfil");
    }
  }

  openMisProductos() {
    this.navCtrl.push(TiendaEcommerceProductosPage, {
      tiendaID: this.tiendaID,
      promocion: this.tienda.promocion
    });
  }

  openHorario() {
    this.navCtrl.push(TiendaHorarioPage, {
      tiendaID: this.tiendaID,
      horario: this.tienda.horario
    });
  }

  faltaCompletarToast() {
    let toast = this.toastCtrl.create({
      message: `Por favor completar Nombre y Logo`,
      duration: 2500,
      position: "middle"
    });
    toast.present();
  }

  middleToast(frase) {
    let toast = this.toastCtrl.create({
      message: frase,
      duration: 2500,
      position: "middle"
    });
    toast.present();
  }

  presentPrompt(tipo) {
    let titulo = "";
    let subtitulo = "";
    let inputType = "";

    if (tipo == "nombre") {
      titulo = "¿Nombre de tu tienda?";
      inputType = "text";
    }

    if (tipo == "titulo") {
      titulo = "Ingrese un título";
      subtitulo = "Sus publicaciones serán mostradas con una frase breve y descriptiva que represente la actividad de su negocio";
      inputType = "text";
    }

    if (tipo == "telefono") {
      titulo = "¿Teléfono de contacto?";
      inputType = "tel";
    }

    if (tipo == "direccion") {
      titulo = "Ingrese dirección de su tienda";
      inputType = "text";
    }

    if (tipo == "admin") {
      titulo = "Nuevo administrador";
      subtitulo = "Ingrese email";
      inputType = "text";
    }

    let alertData: any = {
      title: titulo,
      inputs: [
        {
          type: inputType,
          name: tipo,
          placeholder: "Escribir"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: data => { }
        },
        {
          text: "Ok",
          handler: data => {
            let body = {};

            if (tipo == "nombre") {
              body = { nombre: data.nombre };
            }

            if (tipo == "titulo") {
              body = { nombre: data.titulo };
            }

            if (tipo == "telefono") {
              body = { telefono: data.telefono };
            }

            if (tipo == "direccion") {
              body = { direccion: data.direccion };
            }

            if (tipo == "admin") {
              this.nuevoAdmin(data.admin)
            } else {
              this.actualizarTienda(body);
            }

          }
        }
      ]
    };

    if ((tipo = "admin")) {
      alertData.subTitle = subtitulo;
    }

    let alert = this.alertCtrl.create(alertData);
    alert.present();
  }

  tagExisteToast() {
    let toast = this.toastCtrl.create({
      message: `Esta etiqueta ya está agregada`,
      duration: 2500,
      position: "middle"
    });
    toast.present();
  }

  onChange($event) {
    
    let tags = [];
    let flag = false;

    if (this.tienda.tags) {
      tags = this.tienda.tags
    }

    tags.forEach(tag => {
      if (tag == $event) {
        flag = true;
      }
    });

    if (flag) {
      this.tagExisteToast();
    } else {
      tags.push($event);
      this.actualizarTienda({ tags });
    }
   
  }

  actualizarTienda(body) {
    this._data
      .updateTienda(this.tiendaID, body)
      .then(() => this.cargarTienda());
  }

  nuevoAdmin(email) {
    let admins = this.tienda.admins;

    this._auth.checkEmail(email).then((data: any) => {
      if (data.isTaken) {
        admins.push(email);

        const bodyTienda = {
          admins: admins
        };

        const bodyUser = {
          isTienda: true,
          tienda: {
            id: this.tiendaID,
            tipo: "ecommerce"
          }
        };

        this._auth.actualizarUsuario(bodyUser, data.user._id).then(() => {
          this.actualizarTienda(bodyTienda);
        });
      } else {
        this.middleToast('Usuario no existe');
      }
    });
  }
}

