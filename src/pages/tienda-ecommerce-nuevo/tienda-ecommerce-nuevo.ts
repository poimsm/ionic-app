import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Select } from 'ionic-angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-tienda-ecommerce-nuevo',
  templateUrl: 'tienda-ecommerce-nuevo.html',
})
export class TiendaEcommerceNuevoPage {

  @ViewChild('tiempoDeEntregaRef') tiempoDeEntregaRef: Select;
  @ViewChild('categoriaRef') categoriaRef: Select;
  @ViewChild('variacionRef') variacionRef: Select;


  categoria: string;
  titulo: string;
  descripcion: string;

  EjVariacion: string;
  variacion: string;

  isVariacion = false;
  imagenes = [];
  variaciones = [];

  valorProducto: number;
  costoEnvio: number;

  tiempoDeEntrega: string;
  tipo: string;
  tiendaID: string;
  ciudad: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private imagePicker: ImagePicker,
    private platform: Platform,
    private _data: DataProvider
  ) {
    this.tipo = this.navParams.get('tipo');
    this.tiendaID = this.navParams.get('tiendaID');
    this.ciudad = this.navParams.get('ciudad');
  }

  add(item, tipo) {
    if (!item) {
      return
    }
    if (tipo == 'variacion') {
      this.variaciones.push(item)
    }
    if (tipo == 'imagen') {
      this.imagenes.push(item)
    }
  }

  remove(index, tipo) {
    if (tipo == 'variacion') {
      this.variaciones.splice(index, 1);
    }
    if (tipo == 'imagen') {
      this.imagenes.splice(index, 1);
    }
  }

  onVaracionChange(event: any) {
    if (event == 'Color') {
      this.EjVariacion = 'Ej. Morado'
    }
    if (event == 'Sabor') {
      this.EjVariacion = 'Ej. Limón'
    }
    if (event == 'Talla') {
      this.EjVariacion = 'Ej. L'
    }
    if (event == 'Material') {
      this.EjVariacion = 'Ej. Papel'
    }
  }


  openSelect(tipo) {
    if (tipo == 'categoria') {
      this.categoriaRef.open();
    }
    if (tipo == 'variacion') {
      this.variacionRef.open();
    }
  }

  seleccionar_foto() {

    if (this.platform.is('cordova')) {
      const options: ImagePickerOptions = {
        quality: 70,
        outputType: 1,
        maximumImagesCount: 1
      }
      this.imagePicker.getPictures(options).then((results) => {
        for (var i = 0; i < results.length; i++) {
          this.imagenes.push('data:image/jpeg;base64,' + results[i]);
        }
      }, (err) => { console.log('ERROR') });
    } else {
      const img = "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
      this.imagenes.push('data:image/png;base64,' + img);
    }

  }

  save() {
    const producto: any = {
      titulo: this.titulo,
      descripcion: this.descripcion,
      imgs: this.imagenes,
      categoria: this.categoria,
      tienda: this.tiendaID,
      ciudad: this.ciudad,
      precio: {
        costoEnvio: Number(this.costoEnvio),
        valorProducto: Number(this.valorProducto)
      }
    }

    if (this.isVariacion && this.variaciones.length > 0) {
      producto.variaciones = {
        isActive: true,
        tipo: this.variacion,
        array: this.variaciones
      }
    }

    console.log(producto);

    this._data.crearProductoEcommerce(producto)
      .then(() => console.log('listo'));
  }

}

