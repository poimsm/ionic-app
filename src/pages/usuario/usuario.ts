import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TiendaAlgoDulcePage } from '../tienda-algo-dulce/tienda-algo-dulce';
import { TiendaComidaPage } from '../tienda-comida/tienda-comida';
import { MisPedidosPage } from '../mis-pedidos/mis-pedidos';
import { AuthProvider } from '../../providers/auth/auth';
import { TiendaEcommercePage } from '../tienda-ecommerce/tienda-ecommerce';
import { LocalizacionProvider } from '../../providers/localizacion/localizacion';
import { InscripcionPage } from '../inscripcion/inscripcion';
import { TiendaMueblesPage } from '../tienda-muebles/tienda-muebles';

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {
  tiendaID: string;
  user: any;
  token: string;
  ciudad: string;
  isAdmin = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private _auth: AuthProvider,
    private _localizacion: LocalizacionProvider
  ) {
    this.user = this.navParams.get('user');

    if (this.user.isTienda) {
      this.tiendaID = this.user.tienda.id;
    }

    this.token = this.navParams.get('token');
    this.ciudad = this._localizacion.ciudad;
  }

  reloadUser() {
    this._auth.getUser(this.token)
      .then((data: any) => {
        this.user = data.user;
        console.log(data);
      });
  }

  setLocalizacion() {
    this._localizacion.seleccionarCiudad()
      .then((data: any) => {
        if (data.ok) {
          this.ciudad = data.ciudad
        }
      });
  }

  openTienda() {
    if (this.user.tienda.tipo == 'algo dulce') {
      this.navCtrl.push(TiendaAlgoDulcePage, { id: this.tiendaID });
    }
    if (this.user.tienda.tipo == 'comida') {
      this.navCtrl.push(TiendaComidaPage, { id: this.tiendaID });
    }
    if (this.user.tienda.tipo == 'ecommerce') {
      this.navCtrl.push(TiendaEcommercePage, { id: this.tiendaID });
      // this.navCtrl.push(TiendaMueblesPage, { id: this.tiendaID });
    }
  }

  openHistorial() {
    this.navCtrl.push(MisPedidosPage);
  }

  presentPrompt(tipo) {

    let titulo = '';
    let inputType = '';
    if (tipo == 'direccion') {
      titulo = '¿Cuál es tu dirección?';
      inputType = 'text';
    }

    if (tipo == 'telefono') {
      titulo = '¿Teléfono de contacto?';
      inputType = 'tel';
    }

    let alert = this.alertCtrl.create({
      title: titulo,
      inputs: [
        {
          type: inputType,
          name: tipo,
          placeholder: 'Escribir'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            if (tipo == 'direccion') {
              const body = { address: data.direccion };
              this._auth.actualizarUsuario(body, this.user._id)
                .then(() => {
                  this.reloadUser();
                  this._auth.updateUserStorage(this.token);
                });
            }
            if (tipo == 'telefono') {
              const body = { phone: data.telefono };
              this._auth.actualizarUsuario(body, this.user._id)
                .then(() => {
                  this.reloadUser();
                  this._auth.updateUserStorage(this.token);
                });
            }
          }
        }
      ]
    });
    alert.present();
  }

  openInscripcion() {
    this.navCtrl.push(InscripcionPage, {
      id: this.user._id,
      isSolicitud: this.user.isSolicitud
    });
  }

  logout() {
    // this.afAuth.auth.signOut().then(() => {
    this._auth.logout(this.token, this.user);
    this.navCtrl.pop();
    // this.menuCtrl.close();
    // });
  }


}
