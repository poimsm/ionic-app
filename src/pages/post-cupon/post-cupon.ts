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
import { InfoPage } from "../info/info";
import { DataProvider } from "../../providers/data/data";

@IonicPage()
@Component({
  selector: "page-post-cupon",
  templateUrl: "post-cupon.html"
})
export class PostCuponPage {
  titulo = "";
  descripcion = "";
  fechaInicio = "";
  fechaTermino = "";
  precio: number;
  precioPromocion: number;
  disponibles: number;
  turn_conditions = false;

  @ViewChild(Content)
  cont: Content;

  condiciones = [{ 0: "" }, { 1: "" }];
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

  addItem(i) {
    let item: any = {};
    item[i] = "";
    this.condiciones.push(item);
  }
  deleteList(index) {
    this.condiciones.splice(index, 1);
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
      description: this.descripcion,
      price: this.precio,
      discountPrice: this.precioPromocion,
      img: this.imagen64
      // initDate: this.fechaInicio,
      // endDate: this.fechaTermino
    };

    const temp = (this.precio - this.precioPromocion)/this.precio*100;
    const porcentage = Math.ceil(temp);
    data.porcentage = porcentage;
    
    if (this.turn_conditions) {
      const cons = [];
      this.condiciones.forEach((item,i) => {
        cons.push(item[i]);
      })      
      data.conditions = cons;
    }
    
    this._data
      .addStorePost(token, data, "coupons-create")
      .then(res => console.log("Listooo"));
  }
}
