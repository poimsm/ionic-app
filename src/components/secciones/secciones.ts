import { Component } from '@angular/core';
import { SeccionesProvider } from '../../providers/secciones/secciones';

@Component({
  selector: 'secciones',
  templateUrl: 'secciones.html'
})
export class SeccionesComponent {

  tipo: string;
  
  constructor(private _secciones: SeccionesProvider) {
    this.tipo = _secciones.tipo;
  }

  buscarTiendas(categoria) {
    this._secciones.buscarTiendasPorCategorias(categoria);
  }

}
