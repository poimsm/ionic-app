import { Component, NgZone, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BikeMapaPage } from '../bike-mapa/bike-mapa';
import { FormControl } from "@angular/forms";
// import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
// import { google } from '@agm/core/services/google-maps-types';
// import {} from '@types/googlemaps';
import { google } from '@google/maps';


@IonicPage()
@Component({
  selector: 'page-bike-direccion',
  templateUrl: 'bike-direccion.html',
})
export class BikeDireccionPage {

  public latitude: number;
    public longitude: number;
    public searchControl: FormControl;
    public zoom: number;

    @ViewChild("search")
    public searchElementRef;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();
  }

  openMapa() {
    this.navCtrl.push(BikeMapaPage);
  }

  ionViewDidLoad() {
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
        let nativeHomeInputBox = document.getElementById('txtHome').getElementsByTagName('input')[0];
        let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
            types: ["address"]
        });
        autocomplete.addListener("place_changed", () => {
            this.ngZone.run(() => {
                //get the place result
                let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                //verify result
                if (place.geometry === undefined || place.geometry === null) {
                    return;
                }

                //set latitude, longitude and zoom
                this.latitude = place.geometry.location.lat();
                this.longitude = place.geometry.location.lng();
                this.zoom = 12;
            });
        });
    });
}

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.zoom = 12;
        });
    }
}
}
