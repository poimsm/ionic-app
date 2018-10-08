import { Component, ViewChild, ElementRef } from "@angular/core";
import { IonicPage, NavController, Slides, Content } from "ionic-angular";
import { ProductoPage } from "../index.pages";
import { SubirProvider } from "../../providers/subir/subir";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs/Subject";
import { OutfitProvider } from "../../providers/outfit/outfit";

@IonicPage()
@Component({
  selector: "page-outfits",
  templateUrl: "outfits.html"
})
export class OutfitsPage {
  @ViewChild("slider")
  slider: Slides;
  @ViewChild(Content)
  content: Content;
  @ViewChild("scroller", { read: ElementRef })
  private scroller: ElementRef;
  @ViewChild("holder", { read: ElementRef })
  private holder: ElementRef;
  page = "0";
  startingX: any;
  startingY: any;
  lastY: any;
  outfits = [];
  swipeLenght = [
    "0",
    "30",
    "160",
    "260",
    "360",
    "460",
    "560",
    "660",
    "800",
    "800",
    "800"
  ];
  categorias = ["Pan", "Pan gourmet", "Desayunos", "Cafetería"];
  toQuery = [
    "pan",
    "pan_gourmet",
    "desayunos",
    "cafeteria",
    "outdoor",
    "casa",
    "estampados",
    "profesional",
    "evento"
  ];
  orden = "";
  index = 0;

  bestSellers = [];
  novedad = [];
  recientes = [];
  products = [];

  dispatcher = new Subject<boolean>();

  constructor(public navCtrl: NavController, private _outfit: OutfitProvider) {
    this.fetch(0);
  }
  fetch(idx) {
    console.log(this.categorias[idx]);
    this.products = [];
    this.recientes = [];
    if (idx === 0) {
      this.queryDestacado(this.toQuery[idx], "likes");
      // this.queryReciente(this.toQuery[idx], "novedad");
    } else {
      this.dispatcher.next();
      this.queryDestacado(this.toQuery[idx], "fecha");
      // this.queryReciente(this.toQuery[idx], "fecha");
    }
  }
  queryDestacado(categoria, orden) {
    this._outfit
      .getOutfits(categoria, orden)
      .pipe(takeUntil(this.dispatcher))
      .subscribe(x => {
        this.products = x;
      });
  }
  queryReciente(categoria, orden) {
    this._outfit
      .getOutfits(categoria, orden)
      .pipe(takeUntil(this.dispatcher))
      .subscribe(x => {
        this.recientes = x;
      });
  }
  openProduct(product) {
    this.navCtrl.push(ProductoPage, product);
  }
  handleStart(ev, idx) {
    this.startingX = ev.touches[0].pageX;
    this.startingY = ev.touches[0].pageY;
    this.holder.nativeElement.style.transition = "all 0s";
  }
  handleMove(ev, idx) {
    let currentX = ev.touches[0].pageX;
    let currentY = ev.touches[0].pageY;
    let changeX = this.startingX - currentX;
    let changeY = this.startingY - currentY;
    // if (Math.abs(changeX) < 5) {
    //   return;
    // }
    if (Math.abs(changeY) > 20 && Math.abs(changeX) < 8) {
      return;
    }
    if (Math.abs(changeY) > 40 && Math.abs(changeX) < 30) {
      return;
    }
    if (changeX >= 0 && idx !== 10) {
      let move = -idx * window.screen.width - changeX;
      this.holder.nativeElement.style.transform =
        "translate3d(" + move + "px,0,0)";
    } else if (changeX <= 0 && idx !== 0) {
      let move = -idx * window.screen.width - changeX;
      this.holder.nativeElement.style.transform =
        "translate3d(" + move + "px,0,0)";
    }
  }
  handleEnd(ev, idx) {
    this.holder.nativeElement.style.transition = "all .3s";
    let change = this.startingX - ev.changedTouches[0].pageX;
    let changeAbs = Math.abs(change);
    let threshold = window.screen.width / 3;
    if (change >= 0 && idx !== 10) {
      if (changeAbs < threshold) {
        this.holder.nativeElement.style.transform =
          "translate3d(-" + idx * window.screen.width + "px,0,0)";
      } else {
        this.page = (idx + 1).toString();
        this.content.scrollToTop();
        this.fetch(idx + 1);
        this.scroller.nativeElement.scrollLeft = this.swipeLenght[idx + 1];
        this.holder.nativeElement.style.transform =
          "translate3d(-" + (1 + idx) * window.screen.width + "px,0,0)";
      }
    } else if (change <= 0 && idx !== 0) {
      if (changeAbs < threshold) {
        this.holder.nativeElement.style.transform =
          "translate3d(-" + idx * window.screen.width + "px,0,0)";
      } else {
        this.page = (idx - 1).toString();
        this.scroller.nativeElement.scrollLeft = this.swipeLenght[idx - 1];
        this.fetch(idx - 1);
        this.holder.nativeElement.style.transform =
          "translate3d(" + (1 - idx) * window.screen.width + "px,0,0)";
      }
    }
  }
  moveTo(idx) {
    this.holder.nativeElement.style.transition = "all .3s";
    this.holder.nativeElement.style.transform =
      "translate3d(-" + idx * window.screen.width + "px,0,0)";
  }
  selectedSlide(idx) {
    this.moveTo(idx);
    this.page = idx.toString();
    this.scroller.nativeElement.scrollLeft = this.swipeLenght[idx];
  }
  moveButton($event) {
    this.page = $event._snapIndex.toString();
    this.scroller.nativeElement.scrollLeft = this.swipeLenght[
      $event._snapIndex
    ];
  }
  openPage(pagina) {
    this.navCtrl.push(pagina);
  }
  doInfinite(infiniteScroll) {}
}
