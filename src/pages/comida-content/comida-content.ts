import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Select } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { CarroProvider } from '../../providers/carro/carro';
import { CarroPage } from '../carro/carro';

@IonicPage()
@Component({
  selector: 'page-comida-content',
  templateUrl: 'comida-content.html',
})
export class ComidaContentPage {

  @ViewChild('aderezoRef') aderezoRef: Select;
  @ViewChild('opcionRef') opcionRef: Select;
  @ViewChild('cantidadRef') cantidadRef: Select;

  imgs = [];
  data: any = {};
  precio: number;
  titulo: string;
  total: number;

  precioArray = [];
  precioTag = {};

  aderezos = [];
  opciones = [];
  cantidades = [];

  aderezo = 'Seleccionar';
  cantidad = 'Seleccionar';
  opcion = 'Seleccionar';



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

    if (this.data.aderezos.isActive) {
      this.aderezos = this.data.aderezos.array;
    }

    if (this.data.opciones.isActive) {
      this.opciones = this.data.opciones.array;
    }

    if (this.data.opciones.isActive) {
      this.opciones = this.data.opciones.array;
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
    if (key == 'aderezo') {
      this.aderezoRef.open();
    }
    if (key == 'opcion') {
      this.opcionRef.open();
    }
    if (key == 'cantidad') {
      this.cantidadRef.open();
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
      total: Number(this.total),
      precio: Number(this.total),
      tienda: this.data.tienda,
      tipo: 'comida',
      cantidad: 1
    }
    this._carro.addToCart(compra);
  }

}
