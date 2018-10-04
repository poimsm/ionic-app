import { Component, ViewChild } from "@angular/core";
import { ImagePicker, ImagePickerOptions } from "@ionic-native/image-picker";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { IonicPage, ViewController, NavController } from "ionic-angular";
import { SubirProvider } from "../../providers/subir/subir";
import { AuthProvider } from "../../providers/auth/auth";
import { BrowserProvider } from "../../providers/browser/browser";

@IonicPage()
@Component({
  selector: "page-outfit",
  templateUrl: "outfit.html"
})
export class OutfitPage {
  imagePreview: any;
  base64Image = "";
  titulo = "";
  descripcion = "";
  ciudad = "";
  categoria = "";
  destacado = "destacados";
  precio: number;
  active = [];
  categorias = [];
  products = [];
  opt = "outfit";

  public anArray: any = [];
  ddata = false;

  go =
    "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";

  @ViewChild("myInput")
  myInput;

  constructor(
    public navCtrl: NavController,
    private camera: Camera,
    private imagePicker: ImagePicker,
    private _subir: SubirProvider,
    private _auth: AuthProvider,
    private _browser: BrowserProvider
  ) {}
  onFileChanged(event) {
    const file = event.target.files[0];
    this.base64Image = file;
    console.log("file", file);
  }
  outfit() {
    this.imagePreview = "data:image/jpeg;base64," + this.go;
    this.base64Image = this.go;
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
  cameraOpen() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then(
      imageData => {
        this.imagePreview = "data:image/jpeg;base64," + imageData;
        this.base64Image = imageData;
      },
      err => {
        // Handle error
      }
    );
  }
  findProducts() {
    this._subir
      .getProductById("userId", this._auth.authData.userId)
      .subscribe(data => {
        this.products = data.map(doc => {
          return {
            active: false,
            doc
          };
        });
        console.log(this.products);
      });
  }
  collection(id) {
    let flag = false;
    for (const item of this.active) {
      if (item === id) {
        flag = true;
      }
    }
    if (flag) {
      this.active.splice(this.active.indexOf(id), 1);
      for (const item of this.products) {
        if (item.doc.id === id) {
          item.active = false;
        }
      }
    }
    if (!flag && this.active.length <= 4) {
      this.active.push(id);
      for (const item of this.products) {
        if (item.doc.id === id) {
          item.active = true;
        }
      }
    }
  }
  saveData() {
    this._subir
      .addOutfit(
        this.destacado,
        this.titulo,
        this.categoria,
        this.base64Image,
        this._auth.authData,
        this.active
      )
      .then(outfitId => {
        if (this.products.length > 0) {
          this._subir.updateSelectedProducts(this.products, outfitId);
        }
      });
    // console.log(this.catsActivas);
  }
}
