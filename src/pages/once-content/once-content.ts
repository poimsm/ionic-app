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

    Object.keys(this.data.tabla).forEach(key => {
      this.tabla.push(this.data.tabla[key])
    });

    this.tabla.forEach(item => item.isActive = false);
    this.tabla[0].isActive = true;

    this.precio = this.tabla[0].precio;
    this.total = Number(this.cantidad) * this.precio;

  }

  select(i) {
    this.tabla.forEach(item => item.isActive = false);
    this.tabla[i].isActive = true;
    this.precio = this.tabla[i].precio;
    this.total = Number(this.cantidad) * this.precio;
  }

  cantidadX() {
    this.total = Number(this.cantidad) * this.precio;
  }

  datos(token, compra) {
    const modal = this.modalCtrl.create(DatosPersonalesPage);
    modal.onDidDismiss(data => {

      if (data.ok) {
        compra.telefonoCliente = data.telefono;
        compra.direccionCliente = data.direccion;
        compra.mensaje = data.mensaje;

        // const contacto = {
        //   phone: data.telefono,
        //   address: data.direccion
        // }

        this._data.addCompra(token, compra)
          .then(res => console.log(res));
        // this._data.addContacto(token, contacto)
        // .then(res => {
        //   this._auth.updateUserStorage(token)
        //   .then(data => console.log("listo"));
        // });
      }
    });
    modal.present();
  }

  save() {
    const authData: any = this._auth.credentials;
    const token = authData.token;
    const user = authData.user;

    const compra = {
      titulo: this.data.titulo,
      descripcion: this.data.descripcion,
      precio: this.total + 1000,
      imgUrl: this.data.imgs[0].url,
      vendedor: this.data.vendedor,
      cliente: user._id,
      clienteNombre: user.name,
      telefonoCliente: 0,
      direccionCliente: '',
      estado: 'pendiente'
    }

    this.datos(token, compra);

    // if (user.phone) {
    //   compra.telefonoCliente = user.phone;
    //   compra.direccionCliente =  user.address;

    //   this._data.addCompra(token, compra)
    //   .then(res => console.log(res));

    // } else {
    //   this.datos(token, compra);     
    // }    

  }

}
