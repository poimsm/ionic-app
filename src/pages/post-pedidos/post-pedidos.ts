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
  selector: "page-post-pedidos",
  templateUrl: "post-pedidos.html"
})
export class PostPedidosPage {
  titulo = "";
  descripcion = "";

  precio: number;
  lists = new Array();
  listsObj = new Object();

  @ViewChild(Content)
  cont: Content;

  imagePreview: any;
  imagen64 = "";

  categoria = "";

  go =
    "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";

  activeDays = {};

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
  openPage(page) {
    this.navCtrl.push(page);
  }
  presentInfo(myEvent) {
    const popover = this.popoverCtrl.create(InfoPage);

    popover.present({
      ev: myEvent
    });
  }
  presentPopover(myEvent) {
    const lista = {
      0: "Elegir una opción",
      1: "Elegir multiples opciones"
    };
    const popover = this.popoverCtrl.create(PopCategoriasPage, lista);

    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(data => {
      if (data != null) {
        if (data.index == 0) this.addList("A");
        if (data.index == 1) this.addList("B");
      }
    });
  }

  addList(type) {
    const list = {
      type: type,
      title: "",
      items: [{ 0: "" }, { 1: "" }]
    };
    this.lists.push(list);
  }
  addItem(type, index, i: number) {
    let item: any = {};
    item[i] = "";
    if (type == "combo") {
      this.lists[index].items.push(item);
    }
  }
  deleteList(index) {
    this.lists.splice(index, 1);
  }
  addImg() {
    this.imagePreview = "data:image/jpeg;base64," + this.go;
    // this.base64Image = this.go;
  }
  async save() {

    const retrieve: any = await this._auth.loadStorage();
    const token = retrieve.token;

    this.imagen64 = "data:image/jpg;base64," + this.go;

    const data: any = {
      category: this.categoria,
      title: this.titulo,
      price: this.precio,
      img: this.imagen64
    };

    if (this.lists.length > 0) {
      for (let i = 0; i < this.lists.length; i++) {
        this.listsObj[i] = this.lists[i];
      }
      data.lists = this.listsObj;
    }

    this._data
      .addStorePost(token, data, "food-create")
      .then(res => console.log("Listooo"));
  }
}
