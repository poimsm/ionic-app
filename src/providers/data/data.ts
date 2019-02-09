import { Injectable } from "@angular/core";
import { ToastController, Platform } from 'ionic-angular';
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable()
export class DataProvider {
  apiURL: string;

  constructor(
    public toastCtrl: ToastController,
    public http: HttpClient,
    private platform: Platform
  ) {
    this.setAPI();
  }

  setAPI() {
    if (this.platform.is('cordova')) {
      this.apiURL = 'https://poimsm-server.herokuapp.com';
      // this.apiURL = 'http://localhost:3000';

    } else {
      // this.apiURL = 'https://poimsm-server.herokuapp.com';
      this.apiURL = 'http://localhost:3000';
    }
  }

  comprarEcommerce(token, body) {
    const url = `${this.apiURL}/compras/nueva-compra-ecommerce`;
    const headers = new HttpHeaders({
      Authorization: `JWT ${token}`
    });

    this.presentToast();
    return this.http.post(url, body, { headers }).toPromise();
  }

  notificarCompra(token) {
    const firebaseURL = 'https://us-central1-joopiter-3af7f.cloudfunctions.net/pushNotification';
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
    this.uploadImages(body.imgs)
      .then(imagesData => {
        body.images = imagesData;
        this.http.post(url, body).toPromise()
          .then(() => {
            this.updateTotalProductsTienda(body.tienda, 1);
            this.productoCreado();
          });
      });
  }

  crearProductoEcommerce(body) {
    this.productoSubiendo();
    const url = `${this.apiURL}/apps/ecommerce-crear`;
    this.uploadImages(body.imgs)
      .then(imagesData => {
        body.images = imagesData;
        this.http.post(url, body).toPromise()
          .then(() => {
            this.updateTotalProductsTienda(body.tienda, 1);
            this.productoCreado();
          });
      });
  }

  crearProductoComida(body) {
    this.productoSubiendo();
    const url = `${this.apiURL}/apps/comida-crear`;
    this.uploadImages(body.imgs)
      .then(imagesData => {
        body.images = imagesData;
        this.http.post(url, body).toPromise()
          .then(() => {
            this.updateTotalProductsTienda(body.tienda, 1);
            this.productoCreado();
          });
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

  deleteProductComida(id) {
    const url = `${this.apiURL}/apps/comida-delete/${id}`;
    return this.http.delete(url).toPromise();
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

}
