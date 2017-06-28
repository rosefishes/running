import { Component, ViewChild, ElementRef } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
declare var google: any;


@Component({
  selector: 'page-map',
  providers: [Camera, Geolocation],
  templateUrl: 'map.html'
})
export class MapPage {
  public imageURL: string;
  @ViewChild('mapCanvas') mapElement: ElementRef;
  constructor(private camera: Camera, public confData: ConferenceData, public platform: Platform, private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    this.confData.getMap().subscribe((mapData: any) => {
      let mapEle = this.mapElement.nativeElement;

      var styledMapType = new google.maps.StyledMapType(
        [
          { elementType: 'geometry', stylers: [{ color: '#ebe3cd' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#523735' }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f1e6' }] },
          {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#c9b2a6' }]
          },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#dcd2be' }]
          },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#ae9e90' }]
          },
          {
            featureType: 'landscape.natural',
            elementType: 'geometry',
            stylers: [{ color: '#dfd2ae' }]
          },
          {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{ color: '#dfd2ae' }]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#93817c' }]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry.fill',
            stylers: [{ color: '#a5b076' }]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#447530' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#f5f1e6' }]
          },
          {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [{ color: '#fdfcf8' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{ color: '#f8c967' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#e9bc62' }]
          },
          {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry',
            stylers: [{ color: '#e98d58' }]
          },
          {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#db8555' }]
          },
          {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#806b63' }]
          },
          {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [{ color: '#dfd2ae' }]
          },
          {
            featureType: 'transit.line',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#8f7d77' }]
          },
          {
            featureType: 'transit.line',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#ebe3cd' }]
          },
          {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [{ color: '#dfd2ae' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [{ color: '#b9d3c2' }]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#92998d' }]
          }
        ],
        { name: 'Styled Map' });

      let map = new google.maps.Map(mapEle, {
        center: { lat: 1.2761007, lng: 103.813255 },
        zoom: 14,
        mapTypeControlOptions: {
          mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
            'styled_map']
        }
      });

      var flightPlanCoordinates = [
        { lat: 1.2737864, lng: 103.8174964 },
        { lat: 1.2761007, lng: 103.813255 },
        { lat: 1.2782322, lng: 103.8110981 },
        { lat: 1.2804993, lng: 103.8017108 },
        { lat: 1.2792443, lng: 103.8014168 },
        { lat: 1.2794723, lng: 103.7996038 },
        { lat: 1.2807203, lng: 103.7980268 }
      ];
      var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
      this.geolocation.getCurrentPosition().then((resp) => {
      var myLatLng = {lat: resp.coords.latitude, lng: resp.coords.longitude};
      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
        });
      })
      google.maps.event.addListenerOnce(map, 'idle', () => {
        mapEle.classList.add('show-map');
      });
      map.mapTypes.set('styled_map', styledMapType);
      map.setMapTypeId('styled_map');
      flightPath.setMap(map);
    })
  }
  // const options: CameraOptions = {
  //   quality: 100,
  //   destinationType: this.camera.DestinationType.DATA_URL,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   mediaType: this.camera.MediaType.PICTURE
  // }
  //
  // this.camera.getPicture(options).then((imageData) => {
  //  // imageData is either a base64 encoded string or a file URI
  //  // If it's base64:
  //  let base64Image = 'data:image/jpeg;base64,' + imageData;
  // }, (err) => {
  //  console.log(error)
  // });

  // takePicture(){
  //   this.camera.getPicture({
  //       destinationType: this.camera.DestinationType.DATA_URL,
  //       targetWidth: 1000,
  //       targetHeight: 1000
  //   }).then((imageData) => {
  //     // imageData is a base64 encoded string
  //       this.base64Image = "data:image/jpeg;base64," + imageData;
  //   }, (err) => {
  //       console.log(err);
  //   });
//   takePhoto(){
//   this.camera.getPicture(this.options).then((imageData) => {
//      this.imageURL = 'data:image/jpeg;base64,' + imageData;
//   }, (err) => {
//      console.log(err);
//   });
// }
  // }
  options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }


    takePhoto(){
      alert('hi')
      this.camera.getPicture(this.options).then((imageData) => {
         this.imageURL = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
         console.log(err);
      });
    }
}
