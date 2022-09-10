import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';

@Injectable({
  providedIn: 'root'
})
export class InfosService {

  constructor() { }

  getId = () => {
    return Device.getId()    
  } 
}
