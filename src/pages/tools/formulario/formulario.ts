import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { PopupsProvider } from '../../../providers/popups/popups';
import { AuthProvider } from '../../../providers/auth/auth';
import { ConfigProvider } from '../../../providers/config/config';

@IonicPage()
@Component({
  selector: 'page-formulario',
  templateUrl: 'formulario.html',
})
export class FormularioPage {
 
  apiURL: string;

  constructor(
    public http: HttpClient,
    private _popups: PopupsProvider,
    private _auth: AuthProvider,
    private _config: ConfigProvider
  ) {
    this.apiURL = this._config.apiURL;
  }

  // onFileChanged(event) {
  //   const file: File = event.target.files[0];
  //   this.imgFiles.push(file);
  //   console.log("file", this.imgFiles[0]);
  // }

  // uploadFile() {
  //   const url = `${this.apiURL}/imgs/upload`;
  //   const input = new FormData();
  //   input.append('image', this.imgFiles[0]);
  //   this.http.post(url, input).toPromise()
  //     .then((item: any) => {
  //       this.fileNames.push(item.nombreArchivo);
  //       console.log('Listo!');
  //     });
  // }


  crearTienda(tipo) {

    const email = '0001@joopiter.com';
    const password = '292933';
    const ciudad = 'Valdivia'


    if (tipo == 'algo dulce') {

      this._auth.loginUpFormulario('admin01', email, password)
        .then((res: any) => {
          if (res.ok) {

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
                    tipo: 'algo dulce',
                    isAdmin: true
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

    if (tipo == 'mascotas') {
      console.log('pasooo');
      

      this._auth.loginUpFormulario('admin01', email, password)
        .then((res: any) => {
          if (res.ok) {
            const url = `${this.apiURL}/mascotas/crear-tienda`;

            const body: any = {
              ciudad: ciudad,
              admins: [{
                email,
                id: res.id
              }]
            }

            this.http.post(url, body).toPromise()
              .then((data: any) => {
                const body = {
                  isTienda: true,
                  tipo: 'cuenta tienda',
                  tienda: {
                    id: data.id,
                    tipo: 'mascotas'
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

  // modificarDB() {
  //   const url = `${this.apiURL}/database/modificar-db`;
  //   let imgs = {};

  //   this.fileNames.forEach((item, i) => {
  //     imgs[i] = item;
  //   });

  //   const body = {}

  //   this.http.put(url, body).toPromise()
  //     .then(() => console.log('LISTO!'));
  // }

}
