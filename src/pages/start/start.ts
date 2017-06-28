import { Component } from '@angular/core';
// import { NgForm } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
import { MapPage } from '../map/map';
import { AlertController, NavController } from 'ionic-angular';


@Component({
  selector: 'page-user',
  providers: [Geolocation],
  templateUrl: 'start.html'
})
export class StartPage {
  MapPage = MapPage;
  constructor (public navCtrl: NavController, private geolocation: Geolocation){}

onLocatePosition(){
let position = this.geolocation.getCurrentPosition()
position.then((resp) => {
    this.navCtrl.push(resp.coords.latitude.toString())
}).catch((error) => {
  console.log('Error getting location', error);
});
}

goMap() {
    this.navCtrl.push(MapPage);
}
}
