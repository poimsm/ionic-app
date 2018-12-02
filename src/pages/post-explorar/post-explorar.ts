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
import { PostCalendarPage } from "../post-calendar/post-calendar";

@IonicPage()
@Component({
  selector: "page-post-explorar",
  templateUrl: "post-explorar.html"
})
export class PostExplorarPage {
  titulo = "";
  descripcion = "";
  fecha = "";
  inicio = "";
  termino = "";
  lugar = "";
  duracion = "";
  fechaInicio = "";
  fechaTermino = "";
  turn_hours = false;
  turn_tickets = false;
  precio: number;
  modo = "servicio";

  horas = [{ 0: "" }];

  imagePreview: any;
  imagen64 = "";
  imagenes64 = [];

  categoria = "";

  go =
    "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";

  activeDays = {};
  calendarDB = [
    {
      month: "Diciembre",
      activeDays: [],
      days: [6, 31]
    },
    {
      month: "Enero",
      activeDays: [],
      days: [2, 31]
    },
    {
      month: "Febrero",
      activeDays: [],
      days: [5, 28]
    }
  ];
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
  openMes() {
    const modal = this.modalCtrl.create(PostCalendarPage, {
      calendar: this.calendarDB
    });
    modal.onDidDismiss(data => {
      this.calendarDB = data.calendar;
      this.activeDays = { ...data.activeDays };
    });
    modal.present();
  }
  presentInfo(myEvent) {
    const popover = this.popoverCtrl.create(InfoPage);

    popover.present({
      ev: myEvent
    });
  }

  addItem(type, index, i: number) {
    let item: any = {};
    item[i] = "";
    if (type == "explorar") {
      this.horas.push(item);
    }
  }
  addImg() {
    this.imagePreview = "data:image/jpeg;base64," + this.go;
    // this.base64Image = this.go;
  }
  save() {
    this.imagen64 = "data:image/jpg;base64," + this.go;
    const imagenes64 = {
      0: "data:image/jpg;base64," + this.go,
      1: "data:image/jpg;base64," + this.go
    };

    let data: any = {};
    let route: string;

    if (this.modo == "evento") {
      data = {
        category: this.categoria,
        title: this.titulo,
        description: this.descripcion,
        price: this.precio,
        site: this.lugar,
        imgs: imagenes64,
        initHour: this.inicio,
        endHour: this.termino
      };

      route = "explore/events";
    } else if (this.modo == "servicio") {
      data = {
        category: this.categoria,
        title: this.titulo,
        description: this.descripcion,
        price: this.precio,
        duration: this.duracion,
        site: this.lugar,
        imgs: imagenes64,
        activeDays: this.activeDays,
        isTicket: false
      };

      if (this.turn_hours) {
        data.hours = this.horas;
      }
      if (this.turn_tickets) {
        data.isTicket = true;
      }

      route = "explore/services";
    }

    this._data
      .add(this._auth.token, data, route)
      .then(res => console.log("Listooo"));
  }
}
