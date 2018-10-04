import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Platform } from "ionic-angular";
import { IonicPage, ViewController } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-filtros",
  templateUrl: "filtros.html"
})
export class FiltrosPage {
  mostrar: string;
  ordenar: string;
  options: any;
  constructor(
    public viewCtrl: ViewController,
    private platform: Platform,
    private storage: Storage
  ) {
    this.loadStorage().then(existe => {
      if (existe) {
        this.mostrar = this.options.mostrar;
        this.ordenar = this.options.ordenar;
      } else {
        this.mostrar = "outfit";
        this.ordenar = "cronologico";
      }
    });
  }
  saveStorage() {
    if (this.platform.is("cordova")) {
      this.storage.set("options", JSON.stringify(this.options));
    } else {
      localStorage.setItem("options", JSON.stringify(this.options));
    }
  }
  loadStorage() {
    return new Promise((resolve, reject) => {
      if (this.platform.is("cordova")) {
        this.storage.get("options").then(data => {
          if (data) {
            this.options = data;
            resolve(true);
          } else {
            resolve(false);
          }
        });
      } else {
        if (localStorage.getItem("options")) {
          const retrievedData = localStorage.getItem("options");
          this.options = JSON.parse(retrievedData);
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  }
  removeStorage() {
    if (this.platform.is("cordova")) {
      this.storage.remove("options");
    } else {
      localStorage.removeItem("options");
    }
  }
  close() {
    this.options = {
      mostrar: this.mostrar,
      ordenar: this.ordenar
    };
    this.saveStorage();
    this.viewCtrl.dismiss(this.options);
  }
  mostrarOpt(data) {
    this.mostrar = data;
  }
  ordenOpt(data) {
    this.ordenar = data;
  }
}
