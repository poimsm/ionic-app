import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DatosPersonalesPage } from '../datos-personales/datos-personales';
import { AuthProvider } from '../../providers/auth/auth';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-once-content',
  templateUrl: 'once-content.html',
})
export class OnceContentPage {

  imgs = [];
  data: any = {};
  cantidad = "1";
  precio: number;
  titulo: string;
  telefono: number;
  total: number;
  direccion: string;
  tabla = [];

  variedad: string;
  tamano: string;

  variedades = [];
  tamanos = [];
  variedadesObj: any;
  tamanosObj: any;
  precioVariedad: number;
  cantidadTamano: number;

  token = '';
  user: any = {};

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private _auth: AuthProvider,
    private _data: DataProvider

  ) {
    this.data = this.navParams.get("once");

    Object.keys(this.data.imgs).forEach(key => {
      this.imgs.push(this.data.imgs[key])
    });

    if (this.data.variedad_tamano.isActive) {
      this.variedadesObj = this.data.variedad_tamano.variedades;
      this.tamanosObj = this.data.variedad_tamano.tamanos;

      this.variedad = this.variedadesObj[0].variedad;
      this.tamano = this.tamanosObj[0].tamano;

      this.precioVariedad = this.variedadesObj[0].precio;
      this.cantidadTamano = this.tamanosObj[0].cantidad;
      this.total = Number(this.cantidad) * this.precioVariedad * this.cantidadTamano;

      Object.keys(this.variedadesObj).forEach(key => {
        this.variedades.push(this.variedadesObj[key].variedad);
      });
      Object.keys(this.tamanosObj).forEach(key => {
        this.tamanos.push(this.tamanosObj[key].tamano);
      });

    } else {
      this.precio = this.data.precio;
      this.total = Number(this.cantidad) * this.precio;

    }


  }

  ionViewDidLoad() {
    this._auth.authState.subscribe((data: any) => {
      if (data.isAuth) {
        this.token = data.authData.token;
        this.user = data.authData.user;
      }
    });
  }

  select(i) {
    this.tabla.forEach(item => item.isActive = false);
    this.tabla[i].isActive = true;
    this.precio = this.tabla[i].precio;
    this.total = Number(this.cantidad) * this.precio;
  }

  cantidadX() {
    if (this.data.variedad_tamano.isActive) {
      const indexVariedad = this.variedades.indexOf(this.variedad);
      const indexTamano = this.tamanos.indexOf(this.tamano);
      this.precioVariedad = this.variedadesObj[indexVariedad].precio;
      this.cantidadTamano = this.tamanosObj[indexTamano].cantidad;
      this.total = Number(this.cantidad) * this.precioVariedad * this.cantidadTamano;
    } else {
      this.total = Number(this.cantidad) * this.precio;
    }
  }

  datos(token, compra) {
    const modal = this.modalCtrl.create(DatosPersonalesPage);
    modal.onDidDismiss(data => {

      if (data.ok) {
        compra.clienteTelefono = data.telefono;
        compra.clienteDireccion = data.direccion;

        this._data.comprarOnce(token, compra)
          .then(() => {
            this._data.notificarCompra(token)
              .then(() => console.log('listoo'))
          });
      }
    });
    modal.present();
  }

  save() {
    const compra: any = {
      titulo: this.data.titulo,
      descripcion: this.data.descripcion,
      total: this.total + 1000,
      img: this.data.imgs[0].url,
      vendedorNombre: this.data.vendedor,
      cliente: this.user._id,
      clienteNombre: this.user.name,
      cantidad: `X${this.cantidad}`
    }

    if (this.data.variedad_tamano.isActive) {
      compra.tamano = this.tamano;
      compra.variedad = this.variedad;
    }

    this.datos(this.token, compra);
  }

}
