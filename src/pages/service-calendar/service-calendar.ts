import { Component } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { ObserveOnOperator } from "rxjs/internal/operators/observeOn";

@IonicPage()
@Component({
  selector: "page-service-calendar",
  templateUrl: "service-calendar.html"
})
export class ServiceCalendarPage {
  calendarDB = [];

  calendar = new Observable<any>();
  calendarData = [];
  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.calendarDB = this.navParams.get("calendar");
    this.updateDays();
  }

  updateDays() {
    this.calendarData = [];
    const builder = [];
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
      builder.push({
        month: this.calendarDB[j].month,
        weeks: weeks
      });
    }
    this.calendar = new Observable(data => {
      data.next(builder);
    });
  }

  close() {
    this.viewCtrl.dismiss({ calendar: this.calendarDB });
  }

  select(i, day) {
    const target = Number(day.num) + this.calendarDB[i].days[0] - 1;

    if (day.isActive) {
      const index = this.calendarDB[i].activeDays.indexOf(target);
      this.calendarDB[i].activeDays.splice(index, 1);
    } else {
      this.calendarDB[i].activeDays.push(target);
    }

    this.updateDays();
  }
}
