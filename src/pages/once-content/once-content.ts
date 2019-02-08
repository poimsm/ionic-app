import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Select } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { CarroProvider } from '../../providers/carro/carro';
import { CarroPage } from '../carro/carro';

@IonicPage()
@Component({
  selector: 'page-once-content',
  templateUrl: 'once-content.html',
})
export class OnceContentPage {

  @ViewChild('variedadRef') variedadRef: Select;
  @ViewChild('tamanoRef') tamanoRef: Select;

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
  variaciones = [];
  variedadesObj: any;
  tamanosObj: any;
  precioVariedad: number;
  cantidadTamano: number;
  precioArray = [];
  precioTag = {};

  tag: string;
  token = '';
  user: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _auth: AuthProvider,
    private _carro: CarroProvider
  ) {
    this.data = this.navParams.get("once");
    console.log('DATA', this.data);

    this.imgs = this.data.imgs;

    if (this.data.variaciones.isActive) {
      this.variaciones = this.data.variaciones.array;
      this.variedad = this.data.variaciones.array[0];
    }

    if (this.data.precio.tipo == 'flat') {
      this.total = Number(this.data.precio.value);
    }

    if (this.data.precio.tipo != 'flat') {
      this.precioArray = this.data.precio.array;
      this.precioTag = this.data.precio.array[0];
      this.total = this.data.precio.array[0].precio;
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

  openCart() {
    this.navCtrl.push(CarroPage);
  }

  openSelect(key) {
    if (key == 'variedad') {
      this.variedadRef.open();
    } else {
      this.tamanoRef.open();
    }
  }

  onSelectChange(selectedValue: any) {
    this.total = selectedValue.precio;
  }

  save() {
    const compra: any = {
      titulo: this.data.titulo,
      descripcion: this.data.descripcion,
      img: this.data.imgs[0].url,
      precio: this.total,
      total: this.total,
      tienda: this.data.tienda,
      tipo: 'once',
      cantidad: 1
    }
    this._carro.addToCart(compra);
  }

}
