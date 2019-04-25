import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { MascotasProvider } from '../../../providers/mascotas/mascotas';


@Component({
  selector: 'page-tienda-mascotas-codigo',
  templateUrl: 'tienda-mascotas-codigo.html',
})
export class TiendaMascotasCodigoPage {
  showSearch = true;
  showProduct = false;

  codigoCreado: string;
  codigoEscaneado: string;
  data: any;
  tiendaID: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private _mascotas: MascotasProvider
  ) {
    this.tiendaID = this.navParams.get('tiendaID');
  }


  escanearCodigo() {
    this.showSearch = false;
    this.showProduct = true;
    // this.barcodeScanner.scan().then(barcodeData => {
    //   if (barcodeData.cancelled) {
    //     return;
    //   }
    //   const codigo = barcodeData.text.split(',')[0];
    //   const id = barcodeData.text.split(',')[1];
    //   this.buscar(id, codigo);
    // }).catch(err => {
    //   console.log('Error', err);
    // });
    this.buscar('5cbf8da8cffe5277448ba7dc', '94004');
  }

  buscar(id, code) {
    this._mascotas.buscarCuponPorCodigo(id, code)
      .then(data => {
        this.data = data;
        console.log(data);
      });
  }

}
