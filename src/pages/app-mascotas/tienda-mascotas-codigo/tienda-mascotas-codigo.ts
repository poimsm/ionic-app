import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


@Component({
  selector: 'page-tienda-mascotas-codigo',
  templateUrl: 'tienda-mascotas-codigo.html',
})
export class TiendaMascotasCodigoPage {

  data = {
    titulo: ' Cuidado del gato (nueva toalla de baño exclusiva para huéspedes), WiFi gratis, estacionamiento gratis!',
    precio: '$5.500',
    precioTienda: '$9.990',
    vendidos: '14',
    img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1553150695/gatoo.jpg',
    tienda: {
      img: '',
      nombre: 'Clínica dogcats'
    },
    incluye: [
      'Corte de uñas',
      'Limpieza del canal auditivo',
      'Suelas de afeitado',
      'Baño',
      'Masajes SPA',
      'Cuidado del cabello',
      'Secado y extracción (con artículos de tocador SPA importados de los Estados Unidos e Italia, cada gato ofrece una nueva toalla de baño de alta gama)'
    ],
    notas: [
      '1. Este cupón se limita a la primera visita a la tienda para un nuevo gato.',
      '2. Gatos de pelo largo (como marionetas, Maine, Persia, etc.), gatos que pesan más de 10 kg y padecen enfermedades de la piel, deben agregar $.2000 por artículo',
      '3. Para brindar un mejor servicio, haga una cita con 2 días de anticipación',
      '4. No se pueden utilizar gatos de más de 8 años, gatas preñadas y gatas agresivas.',
      '5. Una vez que la verificación del código de cupón del grupo sea exitosa, significa que la compra se realizó conéxito. No puede solicitar "devolución en ningún momento" y "reembolso vencido"'
    ],
    descripcion: 'nose',
  };

  showSearch = true;
  showProduct = false;

  codigoCreado: string;
  codigoEscaneado: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner
    ) {
  }

  crearCodigo() {
    let data = '2839929';
    this.codigoCreado = data;
    this.showSearch = false;
    this.showProduct = true;  
  }

  escanerCodigo() {
    this.barcodeScanner.scan().then(barcodeData => {
      if (barcodeData.cancelled) {
        return;
      }
      console.log('Barcode data', barcodeData.text);
     }).catch(err => {
         console.log('Error', err);
     });
  }

}
