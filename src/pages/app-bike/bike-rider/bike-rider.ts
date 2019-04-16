import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BikeHistorialPage } from '../bike-historial/bike-historial';
declare var google: any;

@IonicPage()
@Component({
  selector: 'page-bike-rider',
  templateUrl: 'bike-rider.html',
})
export class BikeRiderPage {
  directionsService: any;
  directionsDisplay: any;

  map: any;
  mapReady = false;

  notFound = false;
  vista = 'orden';

  orden = {
    isActive: true,
    datos: {
      distancia: '2.5 km',
      precio: '$5000'
    },
    rider: {
      nombre: 'Juan Cifuentes',
      telefono: '+569985923'
    },
    recoger: {
      address: 'Simon Bolivar 802',
      door: 'Departamento 102',
      persona: {
        nombre: 'Oscar Garcia',
        telefono: '+569029394'
      }
    },
    entregar: {
      address: 'Avenida Ramon Picarte 1003',
      door: 'Departamento 102',
      persona: {
        nombre: 'Daniel Fuentes',
        telefono: '+569948350'
      }
    }
  };

  origin1 = new google.maps.LatLng(55.930385, -3.118425);
  origin2 = new google.maps.LatLng(55.934385, -3.118425);
  destinationA = new google.maps.LatLng(55.937885, -3.118425);

  // imageURL = 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1555011523/tools/navigation.svg';
  imageURL = 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1555014076/tools/bike-parking.svg';

  image = {
    url: this.imageURL,
    // This marker is 20 pixels wide by 32 pixels high.
    // size: new google.maps.Size(100, 100),
    scaledSize: new google.maps.Size(40, 40),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
  };

  // destinationA = 'Stockholm, Sweden';

  isHidden = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
  }

  // ionViewDidEnter() {
  //   //Set latitude and longitude of some place
  //   let latlng = new google.maps.LatLng(39.305, -76.617);
  //   this.map = new google.maps.Map(document.getElementById('map'), {
  //     center: latlng,
  //     zoom: 12
  //   });
  //   // this.map = new google.maps.Map(document.getElementById('map'), {
  //   //   center: { lat: -34.9011, lng: -56.1645 },
  //   //   zoom: 15
  //   // });
  // }

  loadMap() {
    let latlng = new google.maps.LatLng(39.305, -76.617);
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: this.origin1,
      zoom: 12
    });
    this.directionsDisplay.setMap(this.map)
    this.mapReady = true;
    let marker = new google.maps.Marker({
      position: this.origin2,
      map: this.map,
      title: 'Hello Word!',
      icon: this.image,
      // label: {
      //   text: 'Rider',
      //   fontSize: '16px',
      //   fontWeight: '600',
      //   color: 'white'
      // },
      animation: google.maps.Animation.DROP
    });
    this.setRoute();
  }

  setRoute() {
    var self = this
    this.directionsService.route({
      origin: this.origin1,
      destination: this.destinationA,
      travelMode: 'DRIVING',
    }, function (response, status) {
      self.directionsDisplay.setDirections(response);

    })
  }

  openHistorial() {
    this.navCtrl.push(BikeHistorialPage);
  }

  openHorario() {
    
  }

  segmentChanged(event) {
    if (event.value == 'mapa') {
      this.isHidden = false;
      if (!this.mapReady) {
        this.loadMap();
      }
    } else {
      this.isHidden = true;

    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BikeRiderPage');
  }

  changeOrderState() {
    this.orden.isActive = false;
  }

}
