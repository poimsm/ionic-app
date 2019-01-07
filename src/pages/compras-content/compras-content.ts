import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DatosPersonalesPage } from '../datos-personales/datos-personales';
import { AuthProvider } from '../../providers/auth/auth';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-compras-content',
  templateUrl: 'compras-content.html',
})
export class ComprasContentPage {

  imgs = [];
  data: any = {};
  cantidad = "1";
  precio: number;
  titulo: string;
  telefono: number;
  total: number;
  direccion: string;
  tabla = [];

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

    this.precio = this.data.precio;
    this.total = Number(this.cantidad) * this.precio;

  }
  ionViewDidLoad() {
    this._auth.authState.subscribe((data: any) => {
      if (data.isAuth) {
        this.token = data.authData.token;
        this.user = data.authData.user;
      }
    });
  }

  cantidadX() {
    this.total = Number(this.cantidad) * this.precio;
  }

  datos(token, compra) {
    const modal = this.modalCtrl.create(DatosPersonalesPage);
    modal.onDidDismiss(data => {

      if (data.ok) {
        compra.clienteTelefono = data.telefono;
        compra.clienteDireccion = data.direccion;

        this._data.comprarEcommerce(token, compra)
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

    this.datos(this.token, compra);
  }

}
