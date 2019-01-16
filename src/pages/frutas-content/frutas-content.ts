import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarroProvider } from '../../providers/carro/carro';

@IonicPage()
@Component({
  selector: 'page-frutas-content',
  templateUrl: 'frutas-content.html',
})
export class FrutasContentPage {
  productos = [];
  total = 0;
  tienda: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _carro: CarroProvider
  ) {
    this.tienda = this.navParams.get('tienda');
    this.productos = this.tienda.productos;
    this.updateTotal();
    console.log(this.tienda);

  }

  addMore(type, index) {
    if (type == '-') {
      this.productos[index].cantidad -= 1;
      this.productos[index].total = this.productos[index].precio * this.productos[index].cantidad;
      this.updateTotal();
    }
    if (type == 'add') {
      this.productos[index].cantidad += 1;
      this.productos[index].total = this.productos[index].precio * this.productos[index].cantidad;
      this.updateTotal();
    }

    if (type == '+' && this.productos[index].cantidad != 5) {
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

  save() {
    let productos = [];
    this.productos.forEach((item, i) => {
      if (item.cantidad != 0) {
        const data = {
          producto: item.nombre,
          cantidad: item.cantidad,
          tag: item.tag
        }
        productos.push(data)
      }
    });
    const compra = {
      productos,
      total: this.total,
      tipo: 'fruta',
      img: this.tienda.imgs[0].url,
      vendedorNombre: this.tienda.vendedor
    }
    console.log({ compra, tipo: 'frutas' });
    this._carro.agregarItemAlCarro(compra);
  }

}
