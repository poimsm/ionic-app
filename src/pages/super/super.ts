import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuperCategoryPage } from '../super-category/super-category';
import { DataProvider } from "../../providers/data/data";

@IonicPage()
@Component({
  selector: 'page-super',
  templateUrl: 'super.html',
})
export class SuperPage {
  
  productos = [];
  supers :any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private _data: DataProvider) {
    
    const tipo = this.navParams.get('tipo');
    this._data = _data;
    this.getSupers();
    
  }

  openCategories(){
    this.navCtrl.push(SuperCategoryPage);
  }
  setSuper() {
    this.productos = [
      {
        data: [
          {
            img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1552593137/165846.webp',
            titulo: 'Leche colun descre',
            precio: '$1.990'
          },
          {
            img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1552593138/Leche-Colun-light-chocolate-caja-200-cc-1-464856.webp',
            titulo: 'Leche colun descre',
            precio: '$1.990'
          },
          {
            img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1552593138/Yogurt-Natural-sin-az%C3%BAcar.png',
            titulo: 'Leche colun descre',
            precio: '$1.990'
          }
        ]
      },
      {
        data: [
          {
            img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1552593137/yogurt_mora_vaso.png',
            titulo: 'Leche colun descre',
            precio: '$1.990'
          },
          {
            img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1552593137/20075565.webp',
            titulo: 'Leche colun descre',
            precio: '$1.990'
          },
          {
            img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1552593542/leche-semidescremada-sin-lactosa-colun-de-chocolate.png',
            titulo: 'Leche colun descre',
            precio: '$1.990'
          }
        ]
      }
    ];
  }

    getSupers()
    {
      debugger;
      this._data.fetchTiendas('super').then((data: any) => (console.log(data),this.supers = data));
      /*this.supers = [
        {
          nombre: 'nombre 1',
          imgPerfil: '',
          telefono: 524755,
          direccion: 'Por ahi'

        },
        {
          nombre: 'nombre 2',
          imgPerfil: '',
          telefono: 524755,
          direccion: 'Por ahi'

        },
        
      ]*/
    }
  setPetShop() {
    this.productos = [
      {
        data: [
          {
            img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1553339324/70646025056-00-CH515Wx515H.jpg',
            titulo: 'Leche colun descre',
            precio: '$1.990'
          },
          {
            img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1553339325/750617450347-01-CH515Wx515H.jpg',
            titulo: 'Leche colun descre',
            precio: '$1.990'
          },
          {
            img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1553339325/https___s3.amazonaws.com_imagenes-sellers-mercado-ripley_Imagenes-MIRAKL_2018_07_MPM00001156270-1-F.jpg',
            titulo: 'Leche colun descre',
            precio: '$1.990'
          }
        ]
      },
      {
        data: [
          {
            img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1553339325/wmtcl.jpg',
            titulo: 'Leche colun descre',
            precio: '$1.990'
          },
          {
            img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1553339325/Croquetas_Nupec_Weight_Control_para_Perros.png',
            titulo: 'Leche colun descre',
            precio: '$1.990'
          },
          {
            img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1553339325/12.-ROYAL-CANIN-HEPATIC.jpg',
            titulo: 'Leche colun descre',
            precio: '$1.990'
          }
        ]
      }
    ];
  }

}
