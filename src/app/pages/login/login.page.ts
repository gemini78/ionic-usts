import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ICredential } from '../../interfaces/credential';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials: ICredential = {
    "username": "",
    "password": ""
  };

  responseError: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
  }

  onSubmit = () => {
    console.log(this.credentials);
    this.authService.login(this.credentials)
      .subscribe({
        next:(ObjectToken:any) => {
          if (ObjectToken) {
            this.responseError = '';
            this.authService.setToken(ObjectToken.token).then( (token: string)=>{
              if(token) {
                this.router.navigate(['/informations']);
              }            
            })   
          }
        },
        error: (e) => {
          if (e.error.code) {
            this.responseError = 'Identifiants incorrects';
          }
        }
      })
  }
  
}
