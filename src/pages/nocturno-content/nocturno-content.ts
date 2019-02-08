import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarroProvider } from '../../providers/carro/carro';
import { GaleriaPage } from '../galeria/galeria';

@IonicPage()
@Component({
  selector: 'page-nocturno-content',
  templateUrl: 'nocturno-content.html',
})
export class NocturnoContentPage {
  productos = [];
  tienda: any;
  total = 0;
  contador = 0;
  isMenu = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _carro: CarroProvider
  ) {
    this.tienda = this.navParams.get('tienda');
    this.productos = this.tienda.productos;
  }


  addMore(type, index) {
    if (type == '-') {
      this.contador -= 1;
      this.productos[index].cantidad -= 1;
      this.productos[index].total = this.productos[index].precio * this.productos[index].cantidad;
      this.updateTotal();
    }
    if (type == 'add') {
      this.contador += 1;
      this.productos[index].cantidad += 1;
      this.productos[index].total = this.productos[index].precio * this.productos[index].cantidad;
      this.updateTotal();
    }

    if (type == '+' && this.productos[index].cantidad != 5) {
      this.contador += 1;
      this.productos[index].cantidad += 1;
      this.productos[index].total = this.productos[index].precio * this.productos[index].cantidad;
      this.updateTotal();
    }
  }

  updateTotal() {
    let total = 0;
    this.productos.forEach(item => {
      total += item.total;
    });
    this.total = total;
  }

  openGaleria(galeria) {
    this.navCtrl.push(GaleriaPage, { galeria });
  }

  save() {
    let productos = [];
    this.productos.forEach((item, i) => {
      if (item.cantidad != 0) {
        const data = {
          producto: item.nombre,
          descripcion: item.descripcion,
          cantidad: item.cantidad,
          tag: item.tag
        }
        productos.push(data)
      }
    });
    const compra = {
      productos,
      total: this.total,
      tipo: 'nocturno',
      tienda: this.tienda.tienda
    }
    this._carro.addToCart(compra);
    // this._carro.agregarItemAlCarro(compra);

  }

}
