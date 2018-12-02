import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-explorar-calendar',
  templateUrl: 'explorar-calendar.html',
})
export class ExplorarCalendarPage {
  calendarDB = [
    {
      month: "Diciembre",
      activeDays: [6, 23, 24, 25, 26, 27, 28, 29, 30, 35, 36],
      days: [6, 31]
    },
    {
      month: "Enero",
      activeDays: [2, 19, 22, 23, 26, 32],
      days: [2, 31]
    },
    {
      month: "Febrero",
      activeDays: [5, 19, 22, 23, 26, 32],
      days: [5, 28]
    }
  ];
  calendar = [];

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    for (let j = 0; j <= this.calendarDB.length - 1; j++) {
      const start = this.calendarDB[j].days[0];
      const length = this.calendarDB[j].days[1] + start;
      const activeDays = this.calendarDB[j].activeDays;

      let days = [];
      let counter = 0;
      const weeks = [];

      for (let i = 1; i <= length; i++) {
        if (counter == 7) {
          weeks.push({ days });
          counter = 1;
          days = [];
        } else if (i == length) {
          for (let k = 1; k <= 7 - counter; k++) {
            days.push({ isActive: false, num: "" });
          }
          weeks.push({ days });
        } else {
          counter++;
        }

        if (activeDays.indexOf(i) >= 0) {
          days.push({ isActive: true, num: (i + 1 - start).toString() });
        } else if (i < start) {
          days.push({ isActive: false, num: "" });
        } else if (i != length) {
          days.push({ isActive: false, num: (i + 1 - start).toString() });
        }
      }
      this.calendar.push({
        month: this.calendarDB[j].month,
        weeks: weeks
      });
    }
  }

  close() {
    this.viewCtrl.dismiss();
  }

  select(month, day, index) {
    const fiveDays = [];
    const target = Number(day.num);
    console.log(day.num);
    if (day.isActive) {
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
      this.viewCtrl.dismiss({ fiveDays, index });
    }
  }
}
