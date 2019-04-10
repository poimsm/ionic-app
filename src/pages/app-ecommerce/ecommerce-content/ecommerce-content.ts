import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Select, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth/auth';
import { CarroProvider } from '../../../providers/carro/carro';
import { CarroPage } from '../../carro/carro/carro';


@IonicPage()
@Component({
  selector: 'page-ecommerce-content',
  templateUrl: 'ecommerce-content.html',
})
export class EcommerceContentPage {
  @ViewChild('variacionRef') variacionRef: Select;

  imgs = [];
  titulo: string;
  total: number;

  index: number;
  token = '';
  user: any = {};
  producto: any;
  variaciones = [];
  selections = [];

  seleccionDelUsuario = [];

  showProductConfig = false;

  constructor(
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private _auth: AuthProvider,
    private _carro: CarroProvider
  ) {
    this.producto = this.navParams.get("once");
    this.imgs = this.producto.imgs;
    this.total = this.producto.precio.valorProducto;

    if (this.producto.variaciones.isActive) {

      this.showProductConfig = true;
      this.variaciones = this.producto.variaciones.data;

      this.variaciones.forEach((item, i) => {
        this.seleccionDelUsuario[i] = ''
      });
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

  openSelect(index) {
    this.selections = this.variaciones[index].array;
    this.index = index;
    setTimeout(() => {
      this.variacionRef.open();
    }, 100);
  }

  onSelectChange(seleccion) {
    this.seleccionDelUsuario[this.index] = seleccion;
  }

  faltaSelecionar(cosa) {
    let toast = this.toastCtrl.create({
      message: `Por favor seleccione ${cosa}`,
      duration: 2500,
      position: 'middle'
    });
    toast.present();
  }

  save() {
    let counter = 0;
    let flag = true;
    for (let item of this.seleccionDelUsuario) {
      if (item == '') {
        this.faltaSelecionar(this.variaciones[counter].tipo);
        flag = false;
        break;
      }
      counter++
    }

    if (flag) {
      const compra: any = {
        titulo: this.producto.titulo,
        descripcion: this.producto.descripcion,
        img: this.producto.imgs[0].url,
        total: Number(this.total),
        precio: Number(this.total),
        tienda: this.producto.tienda,
        seleccion: this.seleccionDelUsuario,
        tipo: 'ecommerce',
        cantidad: 1
      }
      console.log(compra);

      this._carro.addToCart(compra);
    }


  }

}
