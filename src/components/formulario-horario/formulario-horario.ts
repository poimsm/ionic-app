import { Component } from '@angular/core';
import { ControlProvider } from '../../providers/control/control';


@Component({
  selector: 'formulario-horario',
  templateUrl: 'formulario-horario.html'
})
export class FormularioHorarioComponent {

  lunesCerrado = false;
  martesCerrado = false;
  miercolesCerrado = false;
  juevesCerrado = false;
  viernesCerrado = false;
  sabadoCerrado = false;
  domingoCerrado = false;

  lunes = true;
  martes = true;
  miercoles = true;
  jueves = true;
  viernes = true;
  sabado = true;
  domingo = true;

  lunesInicio: string;
  lunesCierre: string;
  martesInicio: string;
  martesCierre: string;
  miercolesInicio: string;
  miercolesCierre: string;
  juevesInicio: string;
  juevesCierre: string;
  viernesInicio: string;
  viernesCierre: string;
  sabadoInicio: string;
  sabadoCierre: string;
  domingoInicio: string;
  domingoCierre: string;

  dias = [];


  constructor(private _control: ControlProvider) {
  }

  revisarSiCompletoTodo() {
    if (this.lunes &&
      this.martes &&
      this.miercoles &&
      this.jueves &&
      this.viernes &&
      this.sabado &&
      this.domingo
    ) {
      this._control.horario = this.dias;
      this._control.horarioAllGood = true;
    } else {
      this._control.horarioAllGood = false;
    }
  }




  checkHorario() {

    this.lunes = true;
    this.martes = true;
    this.miercoles = true;
    this.jueves = true;
    this.viernes = true;
    this.sabado = true;
    this.domingo = true;

    this.dias = [];

    if (!this.lunesCerrado) {
      if (this.lunesInicio && this.lunesCierre) {
        this.dias.push({
          dia: 'Lunes',
          inicio: this.lunesInicio,
          cierre: this.lunesCierre,
          cerrado: false
        });
      } else {
        this.lunes = false;
      }
    } else {
      this.dias.push({
        dia: 'Lunes',
        cerrado: true
      });
    }
    if (!this.martesCerrado) {
      if (this.martesInicio && this.martesCierre) {
        this.dias.push({
          dia: 'Martes',
          inicio: this.martesInicio,
          cierre: this.martesCierre,
          cerrado: false
        });
      } else {
        this.martes = false;
      }
    } else {
      this.dias.push({
        dia: 'Martes',
        cerrado: true
      });
    }
    if (!this.miercolesCerrado) {
      if (this.miercolesInicio && this.miercolesCierre) {
        this.dias.push({
          dia: 'Miércoles',
          inicio: this.miercolesInicio,
          cierre: this.miercolesCierre,
          cerrado: false
        });
      } else {
        this.miercoles = false;
      }
    } else {
      this.dias.push({
        dia: 'Miércoles',
        cerrado: true
      });
    }
    if (!this.juevesCerrado) {
      if (this.juevesInicio && this.juevesCierre) {
        this.dias.push({
          dia: 'Jueves',
          inicio: this.juevesInicio,
          cierre: this.juevesCierre,
          cerrado: false
        });
      } else {
        this.jueves = false;
      }
    } else {
      this.dias.push({
        dia: 'Jueves',
        cerrado: true
      });
    }
    if (!this.viernesCerrado) {
      if (this.viernesInicio && this.viernesCierre) {
        this.dias.push({
          dia: 'Viernes',
          inicio: this.viernesInicio,
          cierre: this.viernesCierre,
          cerrado: false
        });
      } else {
        this.viernes = false;
      }
    } else {
      this.dias.push({
        dia: 'Viernes',
        cerrado: true
      });
    }
    if (!this.sabadoCerrado) {
      if (this.sabadoInicio && this.sabadoCierre) {
        this.dias.push({
          dia: 'Sábado',
          inicio: this.sabadoInicio,
          cierre: this.sabadoCierre,
          cerrado: false
        });
      } else {
        this.sabado = false;
      }
    } else {
      this.dias.push({
        dia: 'Sábado',
        cerrado: true
      });
    }
    if (!this.domingoCerrado) {
      if (this.domingoInicio && this.domingoCierre) {
        this.dias.push({
          dia: 'Domingo',
          inicio: this.domingoInicio,
          cierre: this.domingoCierre,
          cerrado: false
        });
      } else {
        this.domingo = false;
      }
    } else {
      this.dias.push({
        dia: 'Domingo',
        cerrado: true
      });
    }

    this.revisarSiCompletoTodo();
  }

}
