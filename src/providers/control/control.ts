import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigProvider } from '../config/config';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ControlProvider {
  apiURL: string;

  horarioAllGood: boolean;
  horario = [];


  constructor(public http: HttpClient,
    private _config: ConfigProvider
  ) {
    this.apiURL = this._config.apiURL;
  }

  revisarFormularioHorario() {

    return this.horarioAllGood;
  }
  

}
