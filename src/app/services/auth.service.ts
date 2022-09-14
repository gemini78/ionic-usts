import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICredential } from '../interfaces/credential';
import { IUser } from '../interfaces/user';

const ACCESS_TOKEN_KEY = 'token';
const BASE_URL = 'http://127.0.0.1:8000/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  currentAccessToken = null;

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { 
    this.init();
  }

  init = () => {
    this.storage.create();
  }

  getCurrentAccessToken() {
    return this.currentAccessToken;
  } 
  
  async setToken(token: string) {
    this.currentAccessToken = token;
    this.isAuthenticated.next(true);
    return this.storage.set(ACCESS_TOKEN_KEY, this.currentAccessToken);
  }

  login(credentials: ICredential): Observable<any> {   
    return this.http.post(BASE_URL + '/login_check', credentials)
  } 

  logout = () => {
    this.storage.remove(ACCESS_TOKEN_KEY);
    this.isAuthenticated.next(null);
  }

  register = (user: IUser): Observable<any> => {
    return this.http.post(BASE_URL + '/users', user);
  }
}
