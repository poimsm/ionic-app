import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class BikeProvider {

  rider: AngularFirestoreDocument<any>;
  lat: number = 51.678418;
  lng: number = 7.809007;
  constructor(
    public http: HttpClient,
    private afs: AngularFirestore,
    private geolocation: Geolocation
  ) {
    // this.rider = afs.doc('riders/hola');

    // this.verificarUsuario();
  }

  verificarUsuario() {
    this.afs.doc('riders/hola').valueChanges()
      .subscribe(data => {
        console.log(data);

      })
  }

  iniciarGeoLocalizacion() {
    this.geolocation.getCurrentPosition().then((resp) => {

      this.rider.update({
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      });

      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
        this.rider.update({
          lat: data.coords.latitude,
          lng: data.coords.longitude
        });
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}
