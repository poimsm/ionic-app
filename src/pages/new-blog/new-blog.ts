import { Component, ElementRef, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  PopoverController
} from "ionic-angular";
import { BlogProvider } from "../../providers/blog/blog";
import { AuthProvider } from "../../providers/auth/auth";
import { PopBlogPage } from "../pop-blog/pop-blog";

@IonicPage()
@Component({
  selector: "page-new-blog",
  templateUrl: "new-blog.html"
})
export class NewBlogPage {
  titulo = "Título";
  init = true;
  model = "Escribe algo";
  text = "";
  n = 1;
  // r = 1;
  class = "n1";
  center = false;
  addKey = "Añadir";
  index: number;
  imgs = [];
  categoria = "";
  render = [];
  format = [];
  go =
    "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _blog: BlogProvider,
    private _auth: AuthProvider,
    public popoverCtrl: PopoverController
  ) {}
  openPop() {
    this.navCtrl.push(PopBlogPage);
  }
  presentPopover(myEvent) {
    // let popover = this.popoverCtrl.create();
    // popover.present({
    //   ev: myEvent
    // });
  }
  edit(idx) {
    this.index = idx;
    this.model = this.render[idx].text;
    this.addKey = "Editar";
  }
  enterPress() {
    const ob = {
      type: "br"
    };
    this.render.push(ob);
  }
  addImg() {
    const ob = {
      type: "img",
      img: "data:image/jpeg;base64," + this.go
    };
    this.render.push(ob);
    // this.imgs.push(this.go);
    this.imgs.push(this.go);
  }
  add(key) {
    const ob = {
      type: "text",
      text: this.model,
      class: this.class,
      isCenter: false
    };
    if (this.center) {
      ob.isCenter = true;
    }
    if (key == "Añadir") {
      this.render.push(ob);
    } else if ((key = "Editar")) {
      // this.render.splice(this.index, 1);
      this.render[this.index] = ob;
    } else if (this.model.length == 0) {
      this.render.splice(this.index, 1);
    }
    this.model = "Continuar...";
    this.n = 1;
    this.class = "n1";
    this.center = false;
    this.addKey = "Añadir";
    this.init = true;
  }
  adjustTextarea(event: any): void {
    let textarea: any = event.target;
    textarea.style.overflow = "hidden";
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
    return;
  }
  save() {
    let format = {};
    for (let i = 0; i < this.render.length; i++) {
      if (this.render[i].type === "img") {
        this.render[i].img = "";
      }
      format[i] = this.render[i];
    }
    console.log(format);

    // this._blog.addBlog(this.titulo, format, this.imgs, this._auth.authData);
  }
}
