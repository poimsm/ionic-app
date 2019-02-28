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
  @ViewChild('personaRef') personaRef: Select;
  @ViewChild('unidadRef') unidadRef: Select;


  imgs = [];
  data: any = {};
  precio: number;
  titulo: string;
  total: number;

  tag: string;
  token = '';
  user: any = {};

  unidades = [];
  unidades_seleccion = [];

  cantidad = [];
  cantidad_seleccion = [];

  listas = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _auth: AuthProvider,
    private _carro: CarroProvider
  ) {
    this.data = this.navParams.get("once");
    console.log('DATA', this.data);

    this.imgs = this.data.imgs;


    this.data.listas.forEach(lista => {

      let seleccion = [];
      lista.opciones.forEach(item => {
        seleccion.push({
          isActive: false,
          tag: item
        });
      });
      this.listas.push({
        titulo: lista.titulo,
        tipo: lista.tipo,
        opciones: seleccion
      });
    });


    if (this.data.unidades.isActive) {
      this.unidades = this.data.unidades.array;
      this.unidades.forEach(data => {
        this.unidades_seleccion.push({
          isActive: false,
          tag: data.tag,
          value: data.value
        });
      });
      this.unidades_seleccion[0].isActive = true;
      this.total = this.unidades_seleccion[0].value;
    }

    if (this.data.cantidad.isActive) {
      this.cantidad = this.data.cantidad.array;
      this.cantidad.forEach(data => {
        this.cantidad_seleccion.push({
          isActive: false,
          tag: data.tag,
          value: data.value
        });
      });
      this.cantidad_seleccion[0].isActive = true;
      this.total = this.cantidad_seleccion[0].value;
    }

    if (this.data.precio.isActive) {
      this.total = Number(this.data.precio.value);
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

  seleccionarMultiple(k, i) {
    let flag = false;
    if (!this.listas[k].opciones[i].isActive) {
      flag = true;
    }
    if (flag) {
      this.listas[k].opciones[i].isActive = true;
    } else {
      this.listas[k].opciones[i].isActive = false;
    }
  }

  seleccionarSoloUno(k, i) {
    if (this.listas[k].opciones[i].isActive) {
      return;
    }
    this.listas[k].opciones.forEach(opcion => {
      opcion.isActive = false;
    });
    this.listas[k].opciones[i].isActive = true;
  }

  seleccionarUnidades(index) {
    if (this.unidades_seleccion[index].isActive) {
      return;
    }
    this.unidades_seleccion.forEach(opcion => {
      opcion.isActive = false;
    });
    this.unidades_seleccion[index].isActive = true;
    this.total = this.unidades_seleccion[index].value;
  }

  seleccionarCantidad(index) {
    if (this.cantidad_seleccion[index].isActive) {
      return;
    }
    this.cantidad_seleccion.forEach(cantidad => {
      cantidad.isActive = false;
    });
    this.cantidad_seleccion[index].isActive = true;
    this.total = this.cantidad_seleccion[index].value;
  }

  openCart() {
    this.navCtrl.push(CarroPage);
  }

  save() {

    const seleccion = [];
    this.listas.forEach(lista => {
      lista.opciones.forEach(opcion => {
        if (opcion.isActive) {
          seleccion.push({
            titulo: lista.titulo,
            opcion: opcion.tag
          });
        }
      });
    });

    const compra: any = {
      titulo: this.data.titulo,
      descripcion: this.data.descripcion,
      img: this.data.imgs[0].url,
      total: Number(this.total),
      precio: Number(this.total),
      tienda: this.data.tienda,
      seleccion: seleccion,
      tipo: 'comida',
      cantidad: 1
    }

    console.log(compra);

    this._carro.addToCart(compra);
  }

}
