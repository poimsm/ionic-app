import { Component } from '@angular/core';

/**
 * Generated class for the TiendasComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tiendas',
  templateUrl: 'tiendas.html'
})
export class TiendasComponent {

  text: string;

  constructor() {
    console.log('Hello TiendasComponent Component');
    this.text = 'Hello World';
  }

}
