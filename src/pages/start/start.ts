import { Component } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { Geolocation } from '@ionic-native/geolocation';
import { MapPage } from '../map/map';
import { AlertController, NavController } from 'ionic-angular';


@Component({
  selector: 'page-user',

  templateUrl: 'start.html'
})
export class StartPage {
  MapPage = MapPage;
  constructor (public navCtrl: NavController){}

// onLocateUser(){
//   this.geolocation.getCurrentPosition().then((resp) => {
//     console.log(resp)
// }).catch((error) => {
//   console.log('Error getting location', error);
// });

// let watch = this.geolocation.watchPosition();
// watch.subscribe((data) => {
//   console.log('this')
//   console.log(data)
 // data can be a set of coordinates, or an error (if an error occurred).
 // data.coords.latitude
 // data.coords.longitude
// });
// }
}
