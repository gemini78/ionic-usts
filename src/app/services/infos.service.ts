import { HttpClient, HttpHeaders  }  from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InfosService {
  url: string = 'http://localhost:8000/api/users';
  constructor(private http: HttpClient, private storage: Storage, private authService: AuthService) { 
    this.init();    
  }
  
  init = () => {
    this.storage.create();
  }
  getId = () => {
    return Device.getId()    
  }

  getUsers = () => {
   return this.http.get(this.url);
  }

  getUserById = (id) => {
    return this.http.get(this.url+'/'+id);
  }

  updateUser = (id, user) => {
    return this.http.put(this.url+'/'+id, user);
  }
 

  savePositionCurrentUser = (user:any) => {
    return this.http.put(this.url, user);
  }
}