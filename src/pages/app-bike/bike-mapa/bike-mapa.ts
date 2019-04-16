import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
// import { google } from '@google/maps';
declare var google: any;

@IonicPage()
@Component({
  selector: 'page-bike-mapa',
  templateUrl: 'bike-mapa.html',
})
export class BikeMapaPage {

  map: any;
  GoogleAutocomplete: any;
  autocomplete: any;
  autocompleteItems = [];
  geocoder: any;
  markers = [];


  origin1 = new google.maps.LatLng(55.930385, -3.118425);
  destinationA = 'Stockholm, Sweden';
  service: any;

  tipo: string;

  position: any = { ok: false };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private zone: NgZone,
    public viewCtrl: ViewController
  ) {
    this.tipo = this.navParams.get('tipo');
    this.service = new google.maps.DistanceMatrixService();
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
    this.geocoder = new google.maps.Geocoder;
    this.markers = [];
    this.test();
  }

  test() {

    this.service.getDistanceMatrix(
      {
        origins: [this.origin1],
        destinations: [this.destinationA],
        travelMode: 'DRIVING',
      }, this.callback);
  }

  callback(response, status) {
    console.log('Distancee', response);

    console.log('Distancee2', response.rows[0].elements[0].distance.value);


    // See Parsing the Results for
    // the basics of a callback function.
  }

  ionViewDidEnter() {
    //Set latitude and longitude of some place
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.9011, lng: -56.1645 },
      zoom: 15
    });
  }

  close() {
    this.viewCtrl.dismiss({ tipo: this.tipo, position: this.position });
  }

  updateSearchResults() {
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      });
  }

  selectSearchResult(item) {
    this.clearMarkers();
    this.autocompleteItems = [];

    this.geocoder.geocode({ 'placeId': item.place_id }, (results, status) => {
      if (status === 'OK' && results[0]) {
        this.position = {
          ok: true,
          address: item.description,
          coors: {
            lat: results[0].geometry.location.lat,
            lng: results[0].geometry.location.lng
          }        
        };
        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map,
        });
        this.markers.push(marker);
        this.map.setCenter(results[0].geometry.location);
      } else {
        this.position = {
          ok: false
        };
      }
    })
  }

  clearMarkers() {
    for (var i = 0; i < this.markers.length; i++) {
      console.log(this.markers[i])
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

}
