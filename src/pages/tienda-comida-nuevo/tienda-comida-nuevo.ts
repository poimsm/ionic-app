import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Select } from 'ionic-angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { DataProvider } from '../../providers/data/data';
import { PopupsProvider } from '../../providers/popups/popups';

@IonicPage()
@Component({
  selector: 'page-tienda-comida-nuevo',
  templateUrl: 'tienda-comida-nuevo.html',
})
export class TiendaComidaNuevoPage {

  @ViewChild('tiempoDeEntregaRef') tiempoDeEntregaRef: Select;
  @ViewChild('categoriaRef') categoriaRef: Select;
  @ViewChild('variacionRef') variacionRef: Select;
  @ViewChild('personasRef') personasRef: Select;
  @ViewChild('unidadesRef') unidadesRef: Select;


  categoria: string;
  titulo: string;
  descripcion: string;

  flat = true;
  personas = false;
  unidades = false;
  variable = false;
  flatPrice: number;

  imagenes = [];
  unidadesArray = [];
  personasArray = [];
  aderezos = [];
  opciones = [];

  numeroDePersonas = 'Personas';
  numeroDeUnidades = 'Unidades';

  tiempoDeEntrega: string;
  tipo: string;
  tiendaID: string;
  ciudad: string;
  categorias = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private imagePicker: ImagePicker,
    private platform: Platform,
    private _data: DataProvider,
    private _popups: PopupsProvider
  ) {
    this.tipo = this.navParams.get('tipo');
    this.tiendaID = this.navParams.get('tiendaID');
    this.ciudad = this.navParams.get('ciudad');
  }

  ionViewDidLoad() {
    this.setUp();
  }

  setUp() {
    let categoriasObj = {};
    categoriasObj = this._popups.categoriasEcommerce;
    Object.keys(categoriasObj).forEach(key => {
      this.categorias.push(categoriasObj[key]);
    });
  }

  add(item, tipo) {
    if (!item) {
      return
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
    if (tipo == 'aderezo') {
      this.aderezos.push(item)
    }
    if (tipo == 'opcion') {
      this.opciones.push(item)
    }
  }

  remove(index, tipo) {
    if (tipo == 'personas') {
      this.personasArray.splice(index, 1);
    }
    if (tipo == 'unidades') {
      this.unidadesArray.splice(index, 1);
    }
    if (tipo == 'imagen') {
      this.imagenes.splice(index, 1);
    }
    if (tipo == 'aderezo') {
      this.aderezos.splice(index, 1);
    }
    if (tipo == 'opcion') {
      this.opciones.splice(index, 1);
    }
  }


  openSelect(tipo) {
    if (tipo == 'categoria') {
      this.categoriaRef.open();
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
      tienda: this.tiendaID,
      ciudad: this.ciudad
    }

    if (this.aderezos.length > 0) {
      producto.aderezos = {
        isActive: true,
        array: this.aderezos
      }
    }

    if (this.opciones.length > 0) {
      producto.opciones = {
        isActive: true,
        array: this.opciones
      }
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

    this._data.crearProductoComida(producto);
    this.navCtrl.pop();
  }

}

