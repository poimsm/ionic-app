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
    const url = `${this.apiURL}/mascotas/actualizar-categorias-de-la-tienda/${id}`;
    return this.http.put(url, body).toPromise();
  }

  deleteTiendaCategorias(id, body) {
    const url = `${this.apiURL}/mascotas/delete-categorias/${id}`;
    return this.http.put(url, body).toPromise();
  }

  crearTienda(body) {
    const url = `${this.apiURL}/mascotas/crear-tienda`;
    return this.http.post(url, body).toPromise();
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

  crearReservas(dias, id) {
    const url = `${this.apiURL}/mascotas/crear-reservas`;
    let promesas = [];
    dias.forEach(dia => {
      const data = {
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

  buscarHorasDeReservas(id, fecha) {
    const url = `${this.apiURL}/mascotas/obtener-horas-de-reservas/?fecha=${fecha}&id=${id}`;
    return this.http.get(url).toPromise();
  }

  buscarPorCodigo(id, code) {
    const url = `${this.apiURL}/mascotas/encontrar-por-codigo/?code=${code}&id=${id}`;
    return this.http.get(url).toPromise();
  }

  getAllTiendas() {
    const url = `${this.apiURL}/mascotas/all`;
    return this.http.get(url).toPromise();
  }

  getOneTienda(id) {
    const url = `${this.apiURL}/mascotas/one/${id}`;
    return this.http.get(url).toPromise();
  }

  getTiendasCategoria(categoria) {
    const url = `${this.apiURL}/mascotas/buscar-tiendas-por-categoria/?categoria=${categoria}`;
    return this.http.get(url).toPromise();
  }

  getToday() {
    const url = `${this.apiURL}/mascotas/obtener-dia-de-hoy`;
    return this.http.get(url).toPromise();
  }

  getTresDias() {
    const url = `${this.apiURL}/mascotas/obtener-tres-dias`;
    return this.http.get(url).toPromise();
  }

  updateCredencialesTienda(id, body) {
    const url = `${this.apiURL}/mascotas/actualizar-credenciales-tienda/${id}`;
    return this.http.put(url, body).toPromise();
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


}
