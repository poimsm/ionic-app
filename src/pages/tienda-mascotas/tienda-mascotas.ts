import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController } from 'ionic-angular';
import { TiendaMascotasVentasPage } from '../tienda-mascotas-ventas/tienda-mascotas-ventas';
import { TiendaMascotasProductosPage } from '../tienda-mascotas-productos/tienda-mascotas-productos';
import { TiendaMascotasNuevoPage } from '../tienda-mascotas-nuevo/tienda-mascotas-nuevo';
import { TiendaMascotasCodigoPage } from '../tienda-mascotas-codigo/tienda-mascotas-codigo';
import { TiendaMascotasCuponPage } from '../tienda-mascotas-cupon/tienda-mascotas-cupon';
import { TiendaMascotasPaquetePage } from '../tienda-mascotas-paquete/tienda-mascotas-paquete';
import { TiendaMascotasAgendaPage } from '../tienda-mascotas-agenda/tienda-mascotas-agenda';
import { TiendaMascotasDatosPage } from '../tienda-mascotas-datos/tienda-mascotas-datos';
import { TiendaMascotasInfoPage } from '../tienda-mascotas-info/tienda-mascotas-info';
import { TiendaMascotasStartPage } from '../tienda-mascotas-start/tienda-mascotas-start';


@IonicPage()
@Component({
  selector: 'page-tienda-mascotas',
  templateUrl: 'tienda-mascotas.html',
})
export class TiendaMascotasPage {

  misVentas = TiendaMascotasVentasPage;
  misProductos = TiendaMascotasProductosPage;
  nuevoProducto = TiendaMascotasNuevoPage;
  codigo = TiendaMascotasCodigoPage;
  agenda = TiendaMascotasAgendaPage;
  datos = TiendaMascotasDatosPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController
    ) {
      // this.openModal('start');
      this.openModalStart();
  }

  nuevoActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Seleccione tipo",
      buttons: [
        {
          text: "Cupón",
          handler: () => {
            this.navCtrl.push(TiendaMascotasCuponPage);
          }
        },
        {
          text: "Paquete",
          handler: () => {
            this.navCtrl.push(TiendaMascotasPaquetePage);
          }
        },
        {
          text: "Cancelar",
          role: "cancel"
        }
      ]
    });
    actionSheet.present();
  }  
  
  openPage(page) {
    this.navCtrl.push(page)
  }

  openModal(tipo) {
    const modal = this.modalCtrl.create(TiendaMascotasInfoPage, { tipo });
    modal.onDidDismiss(() => {
    });
    modal.present();
  }

  openModalStart() {
    const modal = this.modalCtrl.create(TiendaMascotasStartPage);
    modal.onDidDismiss(() => {
    });
    modal.present();
  }

}
