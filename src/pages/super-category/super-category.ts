import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SuperCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-super-category',
  templateUrl: 'super-category.html',
})
export class SuperCategoryPage {
  productos = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    const tipo = this.navParams.get('tipo');
    this.setSuperCategory();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuperCategoryPage');
  }

  setSuperCategory() {
    this.productos = [
      {
        data: [
          {
            img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1552593137/165846.webp',
            titulo: 'Lacteos',
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



}
