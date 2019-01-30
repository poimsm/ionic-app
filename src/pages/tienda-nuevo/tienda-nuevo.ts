import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Select } from 'ionic-angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { DataProvider } from '../../providers/data/data';


@IonicPage()
@Component({
  selector: 'page-tienda-nuevo',
  templateUrl: 'tienda-nuevo.html',
})
export class TiendaNuevoPage {

  @ViewChild('tiempoDeEntregaRef') tiempoDeEntregaRef: Select;
  @ViewChild('categoriaRef') categoriaRef: Select;
  @ViewChild('variacionRef') variacionRef: Select;
  @ViewChild('personasRef') personasRef: Select;
  @ViewChild('unidadesRef') unidadesRef: Select;


  categoria: string;
  titulo: string;
  descripcion: string;

  isVariacion = false;
  flat = true;
  personas = false;
  unidades = false;
  variable = false;

  EjVariacion: string;
  flatPrice: number;

  variaciones = [];
  imagenes = [];
  unidadesArray = [];
  personasArray = [];

  numeroDePersonas = 'Seleccionar';
  numeroDeUnidades = 'Seleccionar';

  tiempoDeEntrega: string;
  variacion: string;

  tipo: string;
  tiendaID: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private imagePicker: ImagePicker,
    private platform: Platform,
    private _data: DataProvider
  ) {
    this.tipo = this.navParams.get('tipo');
    this.tiendaID = this.navParams.get('tiendaID');
  }

  add(item, tipo) {
    if (!item) {
      return
    }
    if (tipo == 'variacion') {
      this.variaciones.push(item)
    }
    if (tipo == 'personas') {
      this.personasArray.push(item)
    }
    if (tipo == 'unidades') {
      this.unidadesArray.push(item)
    }
    if (tipo == 'imagen') {
      this.imagenes.push(item)
    }
  }

  remove(index, tipo) {
    if (tipo == 'variacion') {
      this.variaciones.splice(index, 1);
    }
    if (tipo == 'personas') {
      this.personasArray.splice(index, 1);
    }
    if (tipo == 'unidades') {
      this.unidadesArray.splice(index, 1);
    }
    if (tipo == 'imagen') {
      this.imagenes.splice(index, 1);
    }
  }



  onVaracionChange(event: any) {
    if (event == 'Color') {
      this.EjVariacion = 'Ej. Pastel rosado'
    }
    if (event == 'Sabor') {
      this.EjVariacion = 'Ej. Limón'
    }
    if (event == 'Temática') {
      this.EjVariacion = 'Ej. Cumpleaños'
    }
    if (event == 'Variedad') {
      this.EjVariacion = 'Ej. Libre de azucar, sin gluten..'
    }
  }

  openSelect(tipo) {
    if (tipo == 'categoria') {
      this.categoriaRef.open();
    }
    if (tipo == 'tiempoDeEntrega') {
      this.tiempoDeEntregaRef.open();
    }
    if (tipo == 'variacion') {
      this.variacionRef.open();
    }
    if (tipo == 'personas') {
      this.personasRef.open();
    }
    if (tipo == 'unidades') {
      this.unidadesRef.open();
    }
  }

  addPersonas(precio, persona) {
    if (!precio) {
      return
    }
    if (!persona) {
      return
    }
    this.add({ precio, persona }, 'personas');
  }

  addUnidades(precio, unidad) {
    if (!precio) {
      return
    }
    if (!unidad) {
      return
    }
    this.add({ precio, unidad }, 'unidades');
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
      tiempoDeEntrega: this.tiempoDeEntrega,
      tienda: this.tiendaID
    }

    if (this.isVariacion) {
      producto.variaciones = {
        isActive: true,
        tipo: this.variacion,
        array: this.variaciones
      }
    } else {
      producto.variaciones.isActive = false;
    }

    if (this.flat) {
      producto.precio = {
        tipo: 'flat',
        value: this.flatPrice
      }
    }
    if (this.unidades) {
      producto.precio = {
        tipo: 'unidad',
        array: this.unidadesArray
      }
    }

    if (this.personas) {
      producto.precio = {
        tipo: 'persona',
        array: this.personasArray
      }
    }
    console.log(producto);

    this._data.crearProductoOnce(producto)
      .then(() => console.log('listo'));
  }

}
