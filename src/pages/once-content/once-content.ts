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

    Object.keys(this.data.imgs).forEach( key => {
      this.imgs.push(this.data.imgs[key])
    });

    Object.keys(this.data.tabla).forEach( key => {
      this.tabla.push(this.data.tabla[key])
    });

    this.tabla.forEach(item => item.isActive = false);
    this.tabla[0].isActive = true;

    this.precio = this.tabla[0].precio;
    this.total = Number(this.cantidad)*this.precio; 

  }

  // suma(key) {
  //   if ((key == 'up') && (this.cantidad < 4)) {
  //     this.cantidad += 0.5;
  //     this.precio += this.data.precio;
  //   } else if ((key == 'down') && (this.cantidad > 0.5)) {
  //     this.cantidad -= 0.5;
  //     this.precio -= this.data.precio;
  //   }
  // }

  select(i) {
    this.tabla.forEach(item => item.isActive = false);
    this.tabla[i].isActive = true;
    this.precio = this.tabla[i].precio;
    this.total = Number(this.cantidad)*this.precio; 
  }

  cantidadX() {
    this.total = Number(this.cantidad)*this.precio;    
  }

  datos(token, compra) {
    const modal = this.modalCtrl.create(DatosPersonalesPage);
    modal.onDidDismiss(data => {

      if (data.ok) {
        compra.telefonoCliente = data.telefono;
        compra.direccionCliente =  data.direccion;

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

  async save() {
    const retrieve: any = await this._auth.loadStorage();
    const token = retrieve.token;
    const user = retrieve.user;

    const compra = {
      titulo: this.data.titulo,
      descripcion: this.data.descripcion,
      precio: this.total + 1000,
      imgUrl: this.data.imgs[0].url,
      telefonoVendedor: this.data.telefonoVendedor,
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
