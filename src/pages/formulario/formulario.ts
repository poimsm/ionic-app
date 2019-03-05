import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { PopupsProvider } from '../../providers/popups/popups';
import { AuthProvider } from '../../providers/auth/auth';
import { ConfigProvider } from '../../providers/config/config';

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

  apiURL: string;

  constructor(
    public http: HttpClient,
    private _popups: PopupsProvider,
    private _auth: AuthProvider,
    private _config: ConfigProvider
  ) { 
    this.apiURL = this._config.apiURL;
  }

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
    input.append('image', this.imgFiles[0]);
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

  tiendaCrearEcommerce() {

  }
  tiendaCrearComida() {

    const email = 'tienda04@joopiter.com';
    const password = '292933';
    const ciudad = 'Valdivia'

    this._auth.loginUpFormulario('admin01', email, password)
      .then((res: any) => {
        if (res.ok) {
          const url = `${this.apiURL}/apps/tienda-crear`;

          const body: any = {
            tipo: 'comida',
            usuario: res.id,
            promocion: {
              isActive: true
            },
            ciudad: ciudad,
            admins: [{ email, password }]
          }

          this.http.post(url, body).toPromise()
            .then((data: any) => {
              const body = {
                isTienda: true,
                tienda: {
                  id: data.id,
                  tipo: 'comida'
                }
              }
              this._auth.actualizarUsuario(body, res.id)
                .then(() => console.log('LISTOOO'));
            });
        }
      });
  }

  crearTienda(tipo) {

    const email = 'tienda01@joopiter.com';
    const password = '292933';
    const ciudad = 'Valdivia'

    console.log('Pasoo');
    

    if (tipo == 'algo dulce') {

      this._auth.loginUpFormulario('admin01', email, password)
        .then((res: any) => {
          if (res.ok) {
            console.log('Pasoo2');

            const url = `${this.apiURL}/apps/tienda-crear`;

            const body: any = {
              tipo: 'algo dulce',
              usuario: res.id,
              promocion: {
                isActive: true,
                limite: 10
              },
              ciudad: ciudad,
              admins: [email]
            }

            this.http.post(url, body).toPromise()
              .then((data: any) => {
                const body = {
                  isTienda: true,
                  tienda: {
                    id: data.id,
                    tipo: 'algo dulce'
                  }
                }
                console.log('PasooX');

                this._auth.actualizarUsuario(body, res.id)
                  .then(() => console.log('LISTOOO'));
              });
          }
        });
    }

    if (tipo == 'comida') {

      this._auth.loginUpFormulario('admin01', email, password)
        .then((res: any) => {
          if (res.ok) {
            const url = `${this.apiURL}/apps/tienda-crear`;

            const body: any = {
              tipo: 'comida',
              usuario: res.id,
              promocion: {
                isActive: true,
                limite: 10
              },
              ciudad: ciudad,
              admins: [email]
            }

            this.http.post(url, body).toPromise()
              .then((data: any) => {
                const body = {
                  isTienda: true,
                  tienda: {
                    id: data.id,
                    tipo: 'comida'
                  }
                }
                this._auth.actualizarUsuario(body, res.id)
                  .then(() => console.log('LISTOOO'));
              });
          }
        });
    }

    if (tipo == 'ecommerce') {

      this._auth.loginUpFormulario('admin01', email, password)
        .then((res: any) => {
          if (res.ok) {
            const url = `${this.apiURL}/apps/tienda-crear`;

            const body: any = {
              tipo: 'ecommerce',
              usuario: res.id,
              promocion: {
                isActive: true
              },
              ciudad: ciudad,
              admins: [email]
            }

            this.http.post(url, body).toPromise()
              .then((data: any) => {
                const body = {
                  isTienda: true,
                  tienda: {
                    id: data.id,
                    tipo: 'ecommerce'
                  }
                }
                this._auth.actualizarUsuario(body, res.id)
                  .then(() => console.log('LISTOOO'));
              });
          }
        });
    }
  }

  signUp(name, email, password) {
    this._auth.loginUp(name, email, password)
      .then(res => { });
  }

  modificarDB() {
    const url = `${this.apiURL}/database/modificar-db`;
    let imgs = {};

    this.fileNames.forEach((item, i) => {
      imgs[i] = item;
    });

    const body = {}

    this.http.put(url, body).toPromise()
      .then(() => console.log('LISTO!'));
  }

}
