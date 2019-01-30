import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { PopupsProvider } from '../../providers/popups/popups';

@IonicPage()
@Component({
  selector: 'page-formulario',
  templateUrl: 'formulario.html',
})
export class FormularioPage {
  Tipo: string;
  titulo: string;
  categoria: string;
  descripcion: string;
  precio: number;
  tipo: string;
  vendedor: string;
  imgFruta = {};
  imgFiles = [];
  fileNames = [];
  categoriasEcommerce = [];
  categoriasOnce = [];

  isFruta = false;
  isOnce = false;
  variedad_tamano = false;
  isVariedad = false;
  isTamano = false;
  isNormal = true;
  variedad: string;
  precioVariedad: number;
  precioTamano: number;
  tamano: string;
  tamanoNum: number;
  variedades = {};
  tamanos = {};
  indexTamano = 0;
  indexVariedad = 0;

  tiempoDeEntrega: string;



  apiURL = 'http://localhost:3000';
  // apiURL = 'https://poimsm-server.herokuapp.com';

  constructor(
    public http: HttpClient,
    private _popups: PopupsProvider
  ) { }

  ionViewDidLoad() {
    this.setUp();
  }

  agregarVariedad() {
    this.variedades[this.indexVariedad] = {
      variedad: this.variedad
    };
    console.log(this.variedades);
    this.indexVariedad++;
  }

  agregarTamano() {
    this.tamanos[this.indexTamano] = {
      tamano: this.tamano,
      precio: Number(this.precioTamano)
    }
    console.log(this.tamanos);
    this.indexTamano++;
  }

  setUp() {
    Object.keys(this._popups.categoriasOnce).forEach(key => {
      this.categoriasOnce.push(this._popups.categoriasOnce[key]);
    });

    Object.keys(this._popups.categoriasEcommerce).forEach(key => {
      this.categoriasEcommerce.push(this._popups.categoriasEcommerce[key]);
    });
  }

  onFileChanged(event) {
    const file: File = event.target.files[0];
    this.imgFiles.push(file);
    console.log("file", this.imgFiles[0]);
  }

  uploadFile() {
    const url = `${this.apiURL}/imgs/upload`;
    const input = new FormData();
    input.append('img', this.imgFiles[0]);
    this.http.post(url, input).toPromise()
      .then((item: any) => {
        this.fileNames.push(item.nombreArchivo);
        console.log('Listo!');
      });
  }

  create() {
    let url = '';
    let body: any;
    let imgs = {};

    this.fileNames.forEach((item, i) => {
      imgs[i] = item;
    })

    if (this.Tipo == 'Ecommerce') {
      url = `${this.apiURL}/apps/ecommerce-crear`;
      body = {
        titulo: this.titulo,
        descripcion: this.descripcion,
        categoria: this.categoria,
        vendedor: this.vendedor,
        upload: imgs
      }
      const data = {
        isActive: true,
        precio: Number(this.precio)
      }
      body.normal = data;
      console.log(body);

    } else {
      url = `${this.apiURL}/apps/once-crear`;
      body = {
        titulo: this.titulo,
        descripcion: this.descripcion,
        categoria: this.categoria,
        vendedor: this.vendedor,
        upload: imgs,
        tiempoDeEntrega: this.tiempoDeEntrega
      }

      if (this.isVariedad) {
        const data = {
          isActive: true,
          variedades: this.variedades
        }
        body.variedad = data;
      }

      if (this.isTamano) {
        const data = {
          isActive: true,
          tamanos: this.tamanos
        }
        body.tamano = data;
        this.isNormal = false;
      }

      if (this.isNormal) {
        const data = {
          isActive: true,
          precio: this.precio
        }
        body.normal = data;
      }

    }

    this.http.post(url, body).toPromise()
      .then(() => console.log('LISTO!'));
  }

  fruta() {
    const url = `${this.apiURL}/apps/fruta-crear-tienda`;
    let imgs = {};

    this.fileNames.forEach((item, i) => {
      imgs[i] = item;
    });

    const body = {
      vendedor: this.vendedor,
      upload: imgs,
      productos: [{
        nombre: 'Ají morado',
        precio: 1000,
        tag: '$1200 c/u',
        cantidad: 0,
        total: 0
      }]
    }

    this.http.post(url, body).toPromise()
      .then(() => console.log('LISTO!'));

  }

  nocturno() {
    const url = `${this.apiURL}/apps/nocturno-crear-producto`;

    const body = {
      productos: [{
        nombre: 'Pizza',
        precio: 1000,
        tag: '$1200',
        cantidad: 0,
        total: 0
      }]
    }

    this.http.post(url, body).toPromise()
      .then(() => console.log('LISTO!'));
  }

  desayunoSorpresa() {
    const url = `${this.apiURL}/apps/once-crear-sorpresa`;

    const body = {
      tienda: {
        nombre: 'Mi tienda',
        isOpen: false,
        delivery: 'Delivery joopiter - $1000'
      },
      galeria: [
        { url: 'url' }
      ],
      tematicas: [
        { tema: 'globo1' },
        { tema: 'globo1' }
      ],
      tamanos: [
        { tamano: 'globo1', precio: 0 },
        { tamano: 'globo1', precio: 0 }
      ]
    }

    this.http.post(url, body).toPromise()
      .then(() => console.log('LISTO!'));
  }

  tiendaCrear() {
    const url = `${this.apiURL}/apps/tienda-crear`;

    const body = {
      nombre: 'Tienda de juan',
      logo: 'url',
      galeria: [],
      tipo: 'Ninguno',
      usuario: '5c25c1dd92896710f008e95c'
    }
    this.http.post(url, body).toPromise()
      .then(() => console.log('LISTO!'));
  }
}
