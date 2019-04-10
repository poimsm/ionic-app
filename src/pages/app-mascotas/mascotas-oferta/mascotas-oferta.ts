import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IntroduccionPage } from '../introduccion/introduccion';

@IonicPage()
@Component({
  selector: 'page-mascotas-oferta',
  templateUrl: 'mascotas-oferta.html',
})
export class MascotasOfertaPage {

  tipo: string;
  data: object;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tipo = this.navParams.get('tipo');
    this.setData();
  }


  setData() {

    if (this.tipo == 'mascotas') {
      console.log('PASSOO');
      
      this.data = {
        titulo: ' Cuidado del gato (nueva toalla de baño exclusiva para huéspedes), WiFi gratis, estacionamiento gratis!',
        precio: '$5.500',
        precioTienda: '$9.990',
        vendidos: '14',
        img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1553150695/gatoo.jpg',
        tienda: {
          img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1552675605/9bbf1121d6595266dd37d89201d5fdbd.gif',
          nombre: 'Clínica veterinara My Pets'
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
      }
    }

    if (this.tipo == 'muebles') {
      this.data = {
        titulo: 'Mueble para TV Kenzo Estilo Contemporaneo',
        precio: '$15.000',
        precioTienda: '$23.990',
        vendidos: '14',
        img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1552586934/48537102455.jpg',
        tienda: {
          img: 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1552587340/log-01.jpg',
          nombre: 'Muebles modulares Rubik'
        },
        incluye: [
          'Mueble para TV Kenzo Estilo Contemporaneo'
        ],
        notas: [
          '1. Este cupón se limita a la primera visita a la tienda para un nuevo gato.',
          '2. Gatos de pelo largo (como marionetas, Maine, Persia, etc.), gatos que pesan más de 10 kg y padecen enfermedades de la piel, deben agregar $.2000 por artículo',
          '3. Para brindar un mejor servicio, haga una cita con 2 días de anticipación',
          '4. No se pueden utilizar gatos de más de 8 años, gatas preñadas y gatas agresivas.',
          '5. Una vez que la verificación del código de cupón del grupo sea exitosa, significa que la compra se realizó conéxito. No puede solicitar "devolución en ningún momento" y "reembolso vencido"'
        ],
        descripcion: 'nose',
      }
    }

    if (this.tipo == 'auto') {
      this.data = {
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
      }
    }
    console.log(this.data);
    
  }

  openIntro() {
    this.navCtrl.push(IntroduccionPage);
  }


}




