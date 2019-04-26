import { NgModule } from '@angular/core';
import { SeccionesComponent } from './secciones/secciones';
import { TiendasComponent } from './tiendas/tiendas';
import { FormularioHorarioComponent } from './formulario-horario/formulario-horario';
@NgModule({
	declarations: [SeccionesComponent,
    TiendasComponent,
    FormularioHorarioComponent],
	imports: [],
	exports: [SeccionesComponent,
    TiendasComponent,
    FormularioHorarioComponent]
})
export class ComponentsModule {}
