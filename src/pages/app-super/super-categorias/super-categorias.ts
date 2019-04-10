import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuperProductosPage } from '../super-productos/super-productos';


@IonicPage()
@Component({
  selector: 'page-super-categorias',
  templateUrl: 'super-categorias.html',
})
export class SuperCategoriasPage {

  categorias = [
    {
      nombre: 'Lácteos',
      productos: [
        {
          titulo: 'Yogurt natural sin azucar',
          img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1552593138/Yogurt-Natural-sin-az%C3%BAcar.png',
          precio: '$990'
        },
        {
          titulo: 'Leche colun light chocolate',
          img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1552593138/Leche-Colun-light-chocolate-caja-200-cc-1-464856.webp',
          precio: '$1.190'
        },
        {
          titulo: 'Luki chocolate',
          img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1552593539/LUKI-CHOCOLATE-227x300.jpg',
          precio: '$440'
        }
      ]
    },
    {
      nombre: 'Bebidas',
      productos: [
        {
          titulo: 'Bebidas, Pack 3',
          img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1554369153/super/639-bebida-ccu-pack-3.jpg',
          precio: '$2.290'
        },
        {
          titulo: 'Nestea - Limon',
          img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1554369152/super/71YghudczxL._SX569_.jpg',
          precio: '$860'
        },
        {
          titulo: 'Bebida Fanta Naranja',
          img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1554369153/super/R4PzYH6eT52wrRcP7Fo8sw.jpg',
          precio: '$1600'
        }
      ]
    },
    {
      nombre: 'Congelados',
      productos: [
        {
          titulo: 'Hacendado Pizza congelada tomate',
          img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1554369670/super/a5beafb396b3718781bd8f441373138e.1500.0.0.0.wmark.89e79d3a.jpg',
          precio: '$1.990'
        },
        {
          titulo: 'Hamburguesa de tocino La Crianza',
          img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1554369670/super/hamburguesa-vacuno-100g-la-crianza-1.png',
          precio: '$790'
        },
        {
          titulo: 'Congelados Minuto Verde',
          img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1554369668/super/255357.webp',
          precio: '$550'
        }
      ]
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openProductos() {
    this.navCtrl.push(SuperProductosPage);
  }

}
