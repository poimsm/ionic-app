import { Injectable } from "@angular/core";

@Injectable()
export class BrowserProvider {
  swapData = [];

  constructor() {}

  swap(data) {
    this.swapData = data;
    console.log("cargar", this.swapData);
  }
  get() {
    // console.log(this.swapData);

    return this.swapData;
  }
}
