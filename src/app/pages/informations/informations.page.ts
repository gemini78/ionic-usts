import { Component, OnDestroy, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { Map, tileLayer, marker, icon, control } from 'leaflet';
import { InfosService } from '../../services/infos.service';
import jwt_decode from 'jwt-decode';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/services/auth.service';

const INTERVAL_TIME = 5000;
const myIcon = icon({
  iconUrl: './assets/images/icon-red.png',
  iconSize: [40, 40]
});

@Component({
  selector: 'app-informations',
  templateUrl: './informations.page.html',
  styleUrls: ['./informations.page.scss'],
})
export class InformationsPage implements OnInit, ViewWillEnter, OnDestroy {
  coordinates: any;
  users: any;
  uuid: string;
  map: Map;
  myInterval: any;
  marker: any;
  markerArray: any[] = [];
  isConnected: boolean = false;

  constructor(
    private service: InfosService,
    private storage: Storage,
    private servicInfosService: InfosService,
    private authService: AuthService
    ) {
      this.init();    
  }  
  
  ionViewWillEnter(): void {
    if (this.map == null) {
      this.initMap();
    }
  }

  init = () => {
    this.storage.create();   
  }

  ngOnInit() {
    this.getId();

    if(!navigator.geolocation) {
      console.log("Your browser doesn't support geolocation feature!")
    } else {
        this.myInterval = setInterval( () => {
          //console.log('MyInterval');
          navigator.geolocation.getCurrentPosition(this.getPosition);          
        }, INTERVAL_TIME); 
    }

    this.authService.isAuthenticated.subscribe((response) => {
      this.isConnected = response;
      if(!this.isConnected) {
        clearInterval(this.myInterval);
      }
    })
  }

  getId = async () => {
    const info = await this.servicInfosService.getId()
    this.uuid = info.uuid;
  }

  initMap = () => {
    // initialisation de la carte
    this.map = new Map('map').setView([46, 2], 5);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

    }).addTo(this.map);

    control.scale({position: 'bottomright'}).addTo(this.map);
    return;
  }

  getTemplate = (email: string, longitude: number, latitude: number, showAll: boolean = true) => {
    let template: string;
    const long = longitude.toFixed(2);
    const lat = latitude.toFixed(2);

    const others = `
        <span>longitude: ${long}</span><br>
        <span>latitude: ${lat}</span><br>
    `;

    template = `
      <div>
        <strong>${email}</strong> <br>
        ${ showAll? others: ''}
      </div>
    `
    return template;
  }

  getPosition = (position) => {    
    const lat = position.coords.latitude
    const long = position.coords.longitude
    console.log(`My position => lat: ${lat} long: ${long}`);    

    if(this.map) {
      if(this.marker) {
        this.map.removeLayer(this.marker)
      }

      if(this.markerArray.length > 0) {
        this.markerArray.map( (mark) => {
          this.map.removeLayer(mark)
        })
      }

    }

    if( lat != null && long != null && this.map ) {
      
      this.marker = marker([lat, long],  {icon: myIcon})
        .addTo(this.map)
        .bindPopup(`${this.getTemplate('Je suis là',long, lat)}`, { autoClose: false }).openPopup();

      // save position current user
      this.savePosition(lat, long);
    }
    
    this.getUsers();   
  }

  getUsers = () => {
    this.service.getUsers().subscribe( (response) => {
      const allUsers = response['hydra:member'];
      this.users = allUsers.filter(user => user.deviceId !== this.uuid);
      console.log('this.users',this.users);
      
      if(this.users !== undefined && this.users.length > 0) {
        this.users.map( (user: any) => {
          if(user.longitude && user.latitude) {
            if(this.map) {
              let mark = marker([user.latitude, user.longitude])
                  .addTo(this.map)
                  .bindPopup(`${this.getTemplate(user.email,user.longitude, user.latitude, false)}`, { autoClose: false })
                  .openPopup();
              this.markerArray.push(mark);
            }  
          }
        })
      }
    });
  }

  savePosition = (latitude: number, longitude: number) => {
    this.storage.get('token').then((accessToken) => {      
      if (accessToken) {
        const decode = jwt_decode(accessToken)
        const id = decode['id'];
        if(id && this.uuid) {
          const userUpdate = {
            latitude: latitude,
            longitude: longitude,
            deviceId: this.uuid
          }
          this.service.updateUser(id, userUpdate).subscribe( (userUp) => {
            console.log('update', userUp);
            
          })
        }
        //console.log('decode =============>', decode);
      }
    })

  }

  ngOnDestroy(): void {
    clearInterval(this.myInterval);
  }
}
