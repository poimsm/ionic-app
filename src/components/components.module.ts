import { NgModule } from '@angular/core';
import { SeccionesComponent } from './secciones/secciones';
import { TiendasComponent } from './tiendas/tiendas';
@NgModule({
	declarations: [SeccionesComponent,
    TiendasComponent],
	imports: [],
	exports: [SeccionesComponent,
    TiendasComponent]
})
export class ComponentsModule {}
