import { Component, ViewChild } from "@angular/core";
import { ImagePicker, ImagePickerOptions } from "@ionic-native/image-picker";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import { EjemploPage } from "../ejemplo/ejemplo";
import { ProductProvider } from "../../providers/product/product";

@IonicPage()
@Component({
  selector: "page-combo",
  templateUrl: "combo.html"
})
export class ComboPage {
  imagePreview: any;
  base64Image = "";
  principalPreview: any;
  base64Principal = "";
  showKg = true;
  usuario = {};

  opt = "outfit";
  destacado = "";
  category = "";

  titulo = "";
  precio: number;
  pricePer = "";
  descripcion = "";
  opciones = "";
  imagenes = [];
  imagenesPreview = [];
  opcionesArreglo = [];

  go =
    "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";

  @ViewChild("myInput")
  myInput;
  constructor(
    private navParams: NavParams,
    public navCtrl: NavController,
    private imagePicker: ImagePicker,
    private _product: ProductProvider,
    private _auth: AuthProvider
  ) {}
  openEjemplo() {
    this.navCtrl.push(EjemploPage);
  }

  buscar() {
    let tem_1 = 0;
    let extractionPoints = [];
    const text = this.opciones;
    for (let i = 0; i < text.length; i++) {
      if (text.charAt(i) == "[") {
        tem_1 = i;
      }
      if (text.charAt(i) == "]") {
        extractionPoints.push({
          start: tem_1,
          end: i
        });
      }
    }
    for (let item of extractionPoints) {
      let tem_2 = text.substr(item.start + 1, item.end - 1 - item.start);
      this.opcionesArreglo.push(tem_2);
    }
  }
  onFileChanged(event) {
    const file = event.target.files[0];
    this.base64Image = file;
    this.base64Image = file;
    console.log("file", file);
  }
  addImg() {
    this.imagePreview = "data:image/jpeg;base64," + this.go;
    this.base64Image = this.go;
    this.imagenes.push(this.base64Image);
    this.imagenesPreview.push(this.imagePreview);
  }
  principal() {
    this.principalPreview = "data:image/jpeg;base64," + this.go;
    this.base64Principal = this.go;
  }
  resize() {
    var element = this.myInput[
      "_elementRef"
    ].nativeElement.getElementsByClassName("text-input")[0];
    var scrollHeight = element.scrollHeight;
    element.style.height = scrollHeight + "px";
    this.myInput["_elementRef"].nativeElement.style.height =
      scrollHeight + 16 + "px";
  }
  select_photo() {
    const options: ImagePickerOptions = {
      quality: 70,
      outputType: 1,
      maximumImagesCount: 1
    };
    this.imagePicker.getPictures(options).then(
      results => {
        for (var i = 0; i < results.length; i++) {
          this.imagePreview = "data:image/jpeg;base64," + results[i];
          this.base64Image = results[i];
        }
      },
      err => {
        console.log("ERROR en selector", JSON.stringify(err));
      }
    );
  }
  saveData() {
    // this.buscar();
    // let opcionesObject = {};
    // for (let i = 0; i < this.opcionesArreglo.length; i++) {
    //   opcionesObject[i] = this.opcionesArreglo[i];
    // }
    // this._product.addMenu(
    //   this.category,
    //   this.titulo,
    //   this.descripcion,
    //   opcionesObject,
    //   this.base64Image,
    //   this._auth.authData
    // );
  }
}
