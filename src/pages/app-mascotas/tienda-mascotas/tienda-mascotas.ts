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
import { MascotasProvider } from '../../../providers/mascotas/mascotas';


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
  // data: any;
  tiendaID: string;
  tienda: any;
  hoy: any;
  horario: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    private _mascota: MascotasProvider
  ) {
    this.tiendaID = this.navParams.get('tiendaID');
  }

  ionViewDidEnter() {
    this.cargarTienda();
    this.cargarToday();
  }

  cargarToday() {
    this._mascota.getToday()
      .then((data: any) => {
        this.hoy = data.today;
      });
  }

  cargarTienda() {
    this._mascota.getOneTienda(this.tiendaID)
      .then(data => {
        this.tienda = data;
        this.tienda.horario

        this.tienda.horario.forEach(item => {
          if (item.nombre == this.hoy) {
            if (item.cerrado) {
              this.horario = 'Hoy cerrado'
            } else {
              this.horario = `${item.inicio} - ${item.cierre}`;
            }
          }
        });
      });
  }

  nuevoActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Seleccione tipo",
      buttons: [
        {
          text: "Cupón",
          handler: () => {
            this.navCtrl.push(TiendaMascotasCuponPage, { tiendaID: this.tiendaID });
          }
        },
        // {
        //   text: "Paquete",
        //   handler: () => {
        //     this.navCtrl.push(TiendaMascotasPaquetePage, { tiendaID: this.tiendaID });
        //   }
        // },
        {
          text: "Cancelar",
          role: "cancel"
        }
      ]
    });
    actionSheet.present();
  }

  openPage(page) {
    this.navCtrl.push(page, { tiendaID: this.tiendaID })
  }

  openCodigo() {
    this.navCtrl.push(TiendaMascotasCodigoPage, { tiendaID: this.tiendaID });
  }

  openModal(tipo) {
    const modal = this.modalCtrl.create(TiendaMascotasInfoPage, { tipo });
    modal.onDidDismiss(() => {
    });
    modal.present();
  }

  openModalStart() {
    const modal = this.modalCtrl.create(TiendaMascotasStartPage);
    modal.onDidDismiss(res => {
      if (res.ok) {

      } else {
        this.navCtrl.pop();
      }
    });
    modal.present();
  }

}
