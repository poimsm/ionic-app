import { Component } from "@angular/core";
import { ExplorarCalendarPage } from "../explorar-calendar/explorar-calendar";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  ModalController
} from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-explorar-order",
  templateUrl: "explorar-order.html"
})
export class ExplorarOrderPage {
  weekdays = [
    "Sáb",
    "Dom",
    "Lun",
    "Mar",
    "Mié",
    "Jue",
    "Vie",
    "Sáb",
    "Dom",
    "Lun",
    "Mar"
  ];
  calendarDB = [
    {
      month: "Diciembre",
      activeDays: [23, 24, 25, 26, 27, 28, 29, 30],
      days: [6, 31]
    },
    {
      month: "Enero",
      activeDays: [2, 19, 22, 23, 26, 32],
      days: [2, 31]
    },
    {
      month: "Febrero",
      activeDays: [19, 22, 23, 26],
      days: [5, 28]
    }
  ];
  fiveDays = [];

  constructor(
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    const data = this.firstLoad();
    console.log("data", data);

    this.getFiveDays(data);
  }
  close() {
    this.viewCtrl.dismiss();
  }
  firstLoad() {
    const fiveDays = [];
    const start = this.calendarDB[1].activeDays[0];
    const target = this.calendarDB[1].activeDays[1] - start + 1;
    let counter = this.calendarDB[1].days[0];
    for (let i = 1; i <= target - 1; i++) {
      if (counter == 7) {
        counter = 1;
      } else {
        counter++;
      }
    }
    if (target - 1 < this.calendarDB[0].days[0]) {
      fiveDays.push(this.calendarDB[0].days[1] - 1);
      fiveDays.push(this.calendarDB[0].days[1] - 0);
      fiveDays.push(target);
      fiveDays.push(target + 1);
      fiveDays.push(target + 2);
    } else if (target + 1 > this.calendarDB[1].days[1]) {
      fiveDays.push(target - 2);
      fiveDays.push(target - 1);
      fiveDays.push(target);
      fiveDays.push(1);
      fiveDays.push(2);
    } else {
      for (let i = target - 2; i <= target + 2; i++) {
        fiveDays.push(i);
      }
    }
    return { fiveDays, index: counter - 1 };
  }

  openMes() {
    const modal = this.modalCtrl.create(ExplorarCalendarPage);
    modal.onDidDismiss(data => {
      this.getFiveDays(data);
    });
    modal.present();
  }

  getFiveDays(data) {
    this.fiveDays = [];
    for (let i = 1; i <= 5; i++) {
      this.fiveDays.push({
        day: this.weekdays[data.index + 1 - 2 + i],
        num: data.fiveDays[i - 1]
      });
    }
    console.log("5d", this.fiveDays);
  }
}
