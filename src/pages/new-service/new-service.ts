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
import { ServiceCalendarPage } from "../service-calendar/service-calendar";
import { InfoPage } from "../info/info";
import { DataProvider } from "../../providers/data/data";

@IonicPage()
@Component({
  selector: "page-new-service",
  templateUrl: "new-service.html"
})
export class NewServicePage {
  titulo = "";
  descripcion = "";
  fecha = "";
  inicio = "";
  termino = "";
  lugar = "";
  duracion = "";
  fechaInicio = "";
  fechaTermino = "";

  opt = false;
  showTopBar = false;
  precio: number;
  precioPromocion: number;
  disponibles: number;  
  popIndex: number;
  modo: string;
  lists = new Array();
  listsObj = new Object();

  @ViewChild(Content)
  cont: Content;

  contenido = [{ 0: "" }, { 1: "" }];
  condiciones = [{ 0: "" }, { 1: "" }];
  horas = [{ 0: "" }];

  imagePreview: any;
  imagen64 = "";
  imagenes64 = [];
  usuario = {};

  type = "Tipo de publicación";

  categoria = "";

  collections = [];
  go =
    "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";

  activeDays= {};
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
    const modal = this.modalCtrl.create(ServiceCalendarPage, {
      calendar: this.calendarDB
    });
    modal.onDidDismiss(data => {
      this.calendarDB = data.calendar;
      this.activeDays = {...data.activeDays};      
    });
    modal.present();
  }
  presentInfo(myEvent) {
    const popover = this.popoverCtrl.create(InfoPage);

    popover.present({
      ev: myEvent
    });
  }
  presentPopover(myEvent, type) {
    let lista = {};
    if (type == "MODO") {
      lista = {
        0: "Evento",
        1: "Servicio"
      };
    } else if (type == "LISTA") {
      lista = {
        0: "Elegir una opción",
        1: "Elegir multiples opciones"
      };
    }

    const popover = this.popoverCtrl.create(PopCategoriasPage, lista);

    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(data => {
      if (data != null) {
        if (type == "MODO") {
          if (data.index == 0) this.modo = "evento";
          if (data.index == 1) this.modo = "servicio";
        }
        if (type == "LISTA") {
          if (data.index == 0) this.addList("A");
          if (data.index == 1) this.addList("B");
        }
      }
    });
  }
  addOpts() {
    this.opt = true;
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
    } else if (type == "pack") {
      this.contenido.push(item);
    } else if (type == "cupon") {
      this.condiciones.push(item);
    } else if (type == "explorar") {
      this.horas.push(item);
    }
  }
  deleteList(index) {
    this.lists.splice(index, 1);
  }
  addImg() {
    this.imagePreview = "data:image/jpeg;base64," + this.go;
    // this.base64Image = this.go;
  }
  onFileChanged(event) {
    const file = event.target.files[0];
    this.imagen64 = file;
    console.log("file", file);
  }
  onFileChangedMany(event) {
    const file = event.target.files[0];
    this.imagenes64.push(file);
    console.log("file", file);
  }
  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: "Seleccione una opción",
      cssClass: ".action-sheet-md",
      buttons: [
        {
          text: "Combo delivery",
          handler: () => {
            this.type = "combo";
            this.showTopBar = true;
          }
        },
        {
          text: "Pack delivery",
          handler: () => {
            this.type = "pack";
            this.showTopBar = true;
          }
        },
        {
          text: "Cupón",
          handler: () => {
            this.type = "cupon";
            this.showTopBar = true;
          }
        },
        {
          text: "Servicio o Evento (Explorar)",
          handler: () => {
            this.type = "explorar";
            this.showTopBar = true;
          }
        },
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    actionSheet.present();
  }
  save() {

    this.imagen64 = "data:image/jpg;base64," + this.go;
    const imagenes64= {
      0:"data:image/jpg;base64," + this.go,
      1:"data:image/jpg;base64," + this.go
    };

    if (this.type == "combo") {
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
        data.lists = this.listsObj
      }

      this._data.add(this._auth.token, data, "food").then(res =>console.log("Listooo"));
    }
    
    if (this.type == "pack") {
      const data = {
        category: this.categoria,
        title: this.titulo,
        description: this.descripcion,
        price: this.precio,
        img: this.imagen64,
        content:  this.contenido
      };
      this._data.add(this._auth.token, data, "packs").then(res =>console.log("Listooo"));
    }
    
    if (this.type == "cupon") {
      const data = {
        category: this.categoria,
        title: this.titulo,
        description: this.descripcion,
        price: this.precio,
        discountPrice: this.precioPromocion,
        img: this.imagen64,
        initDate: this.fechaInicio,
        endDate: this.fechaTermino,
        conditions: this.condiciones
      };
      console.log(data);
      
      this._data.add(this._auth.token, data, "coupons").then(res =>console.log("Listooo"));
    }

    if (this.type == "explorar") {

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
          hours: this.horas,
          activeDays: this.activeDays
        };

        route = "explore/services";
      }

      if (this.lists.length > 0) {
        for (let i = 0; i < this.lists.length; i++) {
          this.listsObj[i] = this.lists[i];
        }
        data.lists = this.listsObj
      }

      this._data.add(this._auth.token, data, route).then(res =>console.log("Listooo"));
    }
  }
}
