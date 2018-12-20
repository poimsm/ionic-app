import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  PopoverController
} from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import { DataProvider } from "../../providers/data/data";
import { OnceContentPage } from "../once-content/once-content";
import { CategoriasPage } from '../categorias/categorias';

@IonicPage()
@Component({
  selector: 'page-once',
  templateUrl: 'once.html',
})
export class OncePage {
  category = [
    "Galletas",
    "Pan de pascua",
    "Tortas"
  ];

  data = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private _auth: AuthProvider,
    private _data: DataProvider
  ) {
    this.fetchByCategory(-1);
  }

  openOnce(once) {
    this.navCtrl.push(OnceContentPage, {once});
  }
  presentPopover(myEvent) {
    const popover = this.popoverCtrl.create(CategoriasPage, {
      0: "Galletas",
      1: "Pan de pascua",
      2: "Tortas"
    });
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(data => {
      if (data) {
        this.fetchByCategory(data.index);
      }
    });
  }

  async fetchOne(id) {
    const retrieve: any = await this._auth.loadStorage();
    const token = retrieve.token;
    const path = 'apps/once-one';
    this._data.getOne(token, id, path)
    .then(data => console.log(data));
  }

  async fetchByCategory(index) {
    const retrieve: any = await this._auth.loadStorage();
    const token = retrieve.token;
    const route = 'apps/once-all';
    let select = "";

    if (index == -1) {
      select = null;
    } else {
      select = this.category[index];      
    }    
    this._data.getAll(token, 0, 10, select, route)
    .then((data: any[]) => this.data = data
    
    );
  }

}
