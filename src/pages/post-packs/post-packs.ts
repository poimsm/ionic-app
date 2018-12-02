import { Component, ViewChild } from "@angular/core";
import { ImagePicker, ImagePickerOptions } from "@ionic-native/image-picker";
import {
  IonicPage,
  NavController,
  AlertController,
  ActionSheetController,
  PopoverController,
  Content,
  ModalController
} from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import { ProductProvider } from "../../providers/product/product";
import { PopCategoriasPage } from "../pop-categorias/pop-categorias";
import { InfoPage } from "../info/info";
import { DataProvider } from "../../providers/data/data";
@IonicPage()
@Component({
  selector: "page-post-packs",
  templateUrl: "post-packs.html"
})
export class PostPacksPage {
  titulo = "";
  descripcion = "";

  precio: number;

  @ViewChild(Content)
  cont: Content;

  contenido = [{ 0: "" }, { 1: "" }];

  imagePreview: any;
  imagen64 = "";

  categoria = "";
  go =
    "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";

  constructor(
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    private imagePicker: ImagePicker,
    private _product: ProductProvider,
    private _auth: AuthProvider,
    public popoverCtrl: PopoverController,
    private _data: DataProvider
  ) {}
  presentInfo(myEvent) {
    const popover = this.popoverCtrl.create(InfoPage);

    popover.present({
      ev: myEvent
    });
  }
  addItem(type, index, i: number) {
    let item: any = {};
    item[i] = "";
    if (type == "pack") {
      this.contenido.push(item);
    }
  }
  deleteList(index) {
    this.contenido.splice(index, 1);
  }
  addImg() {
    this.imagePreview = "data:image/jpeg;base64," + this.go;
    // this.base64Image = this.go;
  }
  save() {
    this.imagen64 = "data:image/jpg;base64," + this.go;

    const data = {
      category: this.categoria,
      title: this.titulo,
      description: this.descripcion,
      price: this.precio,
      img: this.imagen64,
      content: this.contenido
    };
    this._data
      .add(this._auth.token, data, "packs")
      .then(res => console.log("Listooo"));
  }
}
