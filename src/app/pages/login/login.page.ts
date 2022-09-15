import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
    private toastController: ToastController
  ) {}

  ngOnInit() {
  }

  onSubmit = () => {
    this.authService.login(this.credentials)
      .subscribe({
        next:(ObjectToken:any) => {
          if (ObjectToken) {
            this.responseError = '';
            this.authService.setToken(ObjectToken.token).then( (token: string)=>{
              if(token) {
                this.router.navigate(['/informations']);
                this.presentToast('bottom');
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

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: `Welcome ${this.credentials.username}`,
      duration: 2000,
      position: position,
      color: 'success',
      cssClass: 'my-toast'
    });

    await toast.present();
  }
  
}
