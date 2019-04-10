import { Injectable } from "@angular/core";
import { ToastController, Platform } from 'ionic-angular';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ConfigProvider } from "../config/config";


@Injectable()
export class DataProvider {
  apiURL: string;

  constructor(
    public toastCtrl: ToastController,
    public http: HttpClient,
    private platform: Platform,
    private _config: ConfigProvider
  ) {
    this.apiURL = this._config.apiURL;
  }
  
  comprarEcommerce(token, body) {
    const url = `${this.apiURL}/compras/nueva-compra-ecommerce`;
    const headers = new HttpHeaders({
      Authorization: `JWT ${token}`
    });

    this.presentToast();
    return this.http.post(url, body, { headers }).toPromise();
  }

  notificarCompraDelivery() {
    const firebaseURL = 'https://us-central1-joopiter-3af7f.cloudfunctions.net/pushNotification';
    return this.http.get(firebaseURL).toPromise();
  }

  notificarCompraTienda(id) {
    const firebaseURL = `https://us-central1-joopiter-3af7f.cloudfunctions.net/pushNotification?id=${id}`;
    return this.http.get(firebaseURL).toPromise();
  }

  misComprasEcommerce(token, id) {
    const url = `${this.apiURL}/compras/compras-por-usuario-ecommerce/${id}`;
    const headers = new HttpHeaders({
      Authorization: `JWT ${token}`
    });

    return this.http.get(url, { headers }).toPromise();
  }

  misPedidos(token, id) {
    const url = `${this.apiURL}/compras/compras-por-usuario/${id}`;
    const headers = new HttpHeaders({
      Authorization: `JWT ${token}`
    });

    return this.http.get(url, { headers }).toPromise();
  }

  deliveryOnce() {
    const url = `${this.apiURL}/compras/delivery-once`;
    return this.http.get(url).toPromise();
  }


  deliveryEcommerce() {
    const url = `${this.apiURL}/compras/delivery-ecommerce`;
    return this.http.get(url).toPromise();
  }

  fetchCosas() {
    const url = `${this.apiURL}/apps/cosas-all`;
    return this.http.get(url).toPromise();
  }

  fetchFruta() {
    const url = `${this.apiURL}/apps/fruta-all`;
    return this.http.get(url).toPromise();
  }

  fetchNocturno() {
    const url = `${this.apiURL}/apps/nocturno-all`;
    return this.http.get(url).toPromise();
  }

  fetchSorpresa() {
    const url = `${this.apiURL}/apps/once-sorpresa-all`;
    return this.http.get(url).toPromise();
  }

  fetchAlgoDulceHome(ciudad) {
    const url = `${this.apiURL}/apps/once-home/?ciudad=${ciudad}`;
    return this.http.get(url).toPromise();
  }

  fetchAlgoDulceHomeCategoria(ciudad, categoria) {
    const url = `${this.apiURL}/apps/once-home-categoria/?ciudad=${ciudad}&categoria=${categoria}`;
    return this.http.get(url).toPromise();
  }

  fetchComida(ciudad) {
    const url = `${this.apiURL}/apps/comida-home/?ciudad=${ciudad}`;
    return this.http.get(url).toPromise();
  }

  fetchEcommerce(ciudad) {
    const url = `${this.apiURL}/apps/ecommerce-home/?ciudad=${ciudad}`;
    return this.http.get(url).toPromise();
  }

  nuevaImgGaleria(body) {
    const url = `${this.apiURL}/apps/tienda-imagen-galeria`;
    return this.http.post(url, body).toPromise();
  }

  nuevaImgPerfil(body) {
    const url = `${this.apiURL}/apps/tienda-imagen-perfil`;
    return this.http.put(url, body).toPromise();
  }

  nuevoProductoTienda(body) {
    const url = `${this.apiURL}/apps/tienda-nuevo-producto`;
    return this.http.post(url, body).toPromise();
  }

  fetchTienda(id) {
    const url = `${this.apiURL}/apps/tienda-one/${id}`;
    return this.http.get(url).toPromise();
  }

  updateTienda(id, body) {
    const url = `${this.apiURL}/apps/tienda-editar/${id}`;
    return this.http.put(url, body).toPromise();
  }

  updateTiendaHorario(id, body) {
    const url = `${this.apiURL}/apps/tienda-editar-horario/${id}`;
    return this.http.put(url, body).toPromise();
  }

  updateTotalProductsTienda(id, update) {
    const body = { update };
    const url = `${this.apiURL}/apps/tienda-actualizar-productos/${id}`;
    this.http.put(url, body).toPromise();
  }

  crearSolicitud(id, body) {
    const url = `${this.apiURL}/solicitud/crear/${id}`;
    return this.http.post(url, body).toPromise();
  }

  uploadImages(images) {
    const promesas = [];
    const url = `${this.apiURL}/images/upload-cloudinary`;
    for (let img of images) {
      promesas.push(this.http.post(url, img).toPromise());
    }
    return Promise.all(promesas);
  }

  crearProductoOnce(body) {
    this.productoSubiendo();
    const url = `${this.apiURL}/apps/once-crear`;
    this.http.post(url, body).toPromise()
      .then(() => {
        this.updateTotalProductsTienda(body.tienda, 1);
        this.productoCreado();
      });
  }

  crearProductoEcommerce(body) {
    this.productoSubiendo();
    const url = `${this.apiURL}/apps/ecommerce-crear`;
    this.http.post(url, body).toPromise()
      .then(() => {
        this.updateTotalProductsTienda(body.tienda, 1);
        this.productoCreado();
      });
  }

  crearProductoComida(body) {
    this.productoSubiendo();
    const url = `${this.apiURL}/apps/comida-crear`;
    this.http.post(url, body).toPromise()
      .then(() => {
        this.updateTotalProductsTienda(body.tienda, 1);
        this.productoCreado();
      });
  }

  onceByTiendID(id) {
    const url = `${this.apiURL}/apps/once-por-tienda/${id}`;
    return this.http.get(url).toPromise();
  }

  ecommerceByTiendID(id) {
    const url = `${this.apiURL}/apps/ecommerce-por-tienda/${id}`;
    return this.http.get(url).toPromise();
  }

  comidaByTiendID(id) {
    const url = `${this.apiURL}/apps/comida-por-tienda/${id}`;
    return this.http.get(url).toPromise();
  }

  deleteProductOnce(id) {
    const url = `${this.apiURL}/apps/once-delete/${id}`;
    return this.http.delete(url).toPromise();
  }

  changeStateProductComida(id, flag) {
    const url = `${this.apiURL}/apps/comida-isActive/${id}`;
    const body = { isActive: flag };
    return this.http.put(url, body).toPromise();
  }

  changeStateProductOnce(id, flag) {
    const url = `${this.apiURL}/apps/once-isActive/${id}`;
    const body = { isActive: flag };
    return this.http.put(url, body).toPromise();
  }

  promoLanzamientoComida(id, tiendaID) {
    const url = `${this.apiURL}/apps/comida-promoLanzamiento/${id}`;
    const body = { tiendaID };
    return this.http.put(url, body).toPromise();
  }

  promoLanzamientoOnce(id, tiendaID) {
    const url = `${this.apiURL}/apps/once-promoLanzamiento/${id}`;
    const body = { tiendaID };
    return this.http.put(url, body).toPromise();
  }

  deleteProductEcommerce(id) {
    const url = `${this.apiURL}/apps/ecommerce-delete/${id}`;
    return this.http.delete(url).toPromise();
  }

  getAll(skip, limit, category, ciudad, route) {

    let url = `${this.apiURL}/${route}`;
    url = url + `?limit=${limit}&skip=${skip}&ciudad=${ciudad}`;

    if (category) {
      url = url + `&category=${category}`;
    }
    return this.http.get(url).toPromise();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: '¡Producto agregado!',
      duration: 2500,
      position: 'bottom'
    });
    toast.present();
  }

  productoSubiendo() {
    let toast = this.toastCtrl.create({
      message: 'El producto se está subiendo...',
      duration: 2500,
      position: 'bottom'
    });
    toast.present();
  }

  productoCreado() {
    let toast = this.toastCtrl.create({
      message: 'Producto creado con exito',
      duration: 2500,
      position: 'bottom'
    });
    toast.present();
  }
  
  // ------------------------------------
  //             INSCRIPCIONES
  // ------------------------------------

  // ------------------------------------
  //             IMAGENES
  // ------------------------------------

  // ------------------------------------
  //             MASCOTAS
  // ------------------------------------
  
  updateTienda_Mascota(id, body) {
    const url = `${this.apiURL}/mascotas/update/${id}`;
    return this.http.put(url, body).toPromise();
  }

  crearCupon_Mascota(body) {
    const url = `${this.apiURL}/mascotas/crear-cupon`;
    this.http.post(url, body).toPromise()
      .then(() => this.productoCreado());
  }
  
  getTiendas_Mascota() {
    const url = `${this.apiURL}/mascotas/all`;
    return this.http.get(url).toPromise();
  }

  getOneTienda_Mascota(id) {
    const url = `${this.apiURL}/mascotas/one/${id}`;
    return this.http.get(url).toPromise();
  }

  getTiendasSegunCategoria_Mascota(categoria) {
    const url = `${this.apiURL}/mascotas/categoria/?categoria=${categoria}`;
    return this.http.get(url).toPromise();
  }

  

  // ------------------------------------
  //             BELLEZA
  // ------------------------------------

  // ------------------------------------
  //             ESTILO
  // ------------------------------------


}
