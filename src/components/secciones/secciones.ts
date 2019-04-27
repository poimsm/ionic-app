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

  buscarTiendasMascotas(categoria) {
    console.log('hoola')
    // this._secciones.buscarTiendasDeEstiloPorCategorias(categoria);

    this._secciones.buscarTiendasDeMascotasPorCategorias(categoria);
  }

  buscarTiendasEstilo(categoria) {
    this._secciones.buscarTiendasDeEstiloPorCategorias(categoria);
  }

  buscarTiendasBelleza(categoria) {
    this._secciones.buscarTiendasDeBellezaPorCategorias(categoria);
  }

}
