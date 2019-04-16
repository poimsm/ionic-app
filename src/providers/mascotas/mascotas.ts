import { Injectable } from "@angular/core";
import { ToastController, Platform } from 'ionic-angular';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ConfigProvider } from "../config/config";

@Injectable()
export class MascotasProvider {
  apiURL: string;

  constructor(
    public toastCtrl: ToastController,
    public http: HttpClient,
    private platform: Platform,
    private _config: ConfigProvider
  ) {
    this.apiURL = this._config.apiURL;
  }

  updateTienda(id, body) {
    const url = `${this.apiURL}/mascotas/update/${id}`;
    return this.http.put(url, body).toPromise();
  }  

  updateTiendaCategorias(id, body) {
    const url = `${this.apiURL}/mascotas/update-categorias/${id}`;
    return this.http.put(url, body).toPromise();
  }

  deleteTiendaCategorias(id, body) {
    const url = `${this.apiURL}/mascotas/delete-categorias/${id}`;
    return this.http.put(url, body).toPromise();
  }

  crearCupon(tiendaID, body, isReservas, dias) {
    const url = `${this.apiURL}/mascotas/crear-cupon`;
    this.http.post(url, body).toPromise()
      .then((data: any) => {
        this.updateTiendaCategorias(tiendaID, { productoID: data._id, categoria: body.categoria });
        if (isReservas) {
          this.crearReservas(dias, data._id);
        } else {
          this.productoCreado();
        }
      });
  }

  borrarCupon() {
    // pendiente
  }

  productoCreado() {
    let toast = this.toastCtrl.create({
      message: 'Producto creado con exito',
      duration: 2500,
      position: 'bottom'
    });
    toast.present();
  }


  crearReservas(dias, id) {
    const url = `${this.apiURL}/mascotas/crear-reservas`;
    let promesas = [];
    dias.forEach(dia => {
      const data = {
        dia: dia.dia,
        fecha: dia.fecha,
        cupon: id,
        horas: dia.horas
      }
      promesas.push(this.http.post(url, data).toPromise());
    });
    Promise.all(promesas).then(() => {
      this.productoCreado();
    });
  }

  getTiendas() {
    const url = `${this.apiURL}/mascotas/all`;
    return this.http.get(url).toPromise();
  }

  getOneTienda(id) {
    const url = `${this.apiURL}/mascotas/one/${id}`;
    return this.http.get(url).toPromise();
  }


  getTiendasSegunCategoria(categoria) {
    const url = `${this.apiURL}/mascotas/categoria/?categoria=${categoria}`;
    return this.http.get(url).toPromise();
  }

  getToday() {
    const url = `${this.apiURL}/mascotas/hoy`;
    return this.http.get(url).toPromise();
  }

  getServerTime() {
    const url = `${this.apiURL}/mascotas/dias`;
    return this.http.get(url).toPromise();
  }


}
