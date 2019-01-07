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
  imgFiles = [];
  fileNames = [];
  categoriasEcommerce = [];
  categoriasOnce = [];

  variedad_tamano = false;
  isVariedad = false;
  isTamano = false;
  variedad: string;
  precioVariedad: number;
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
      variedad: this.variedad,
      precio: this.precioVariedad
    };
    console.log(this.variedades);
    this.indexVariedad++;
  }

  agregarTamano() {
    this.tamanos[this.indexTamano] = {
      tamano: this.tamano,
      cantidad: this.tamanoNum
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
        precio: this.precio,
        upload: imgs
      }
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
        body.variedades = this.variedades;
      } else if (this.isTamano) {
        body.tamanos = this.tamanos;
      } else {
        body.precio = this.precio
      }

    }

    this.http.post(url, body).toPromise()
      .then(() => console.log('LISTO!'));
  }
}
