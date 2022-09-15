import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IUser } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: IUser = {
    "email": "",
    "password": ""
  };

  errorsMsg: string[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
    ) { }

  ngOnInit() {
  }

  onSubmit = () => {
    //console.log(this.user);
    this.authService.register(this.user).subscribe({
      next: (response) => {
        this.errorsMsg = [];
        if(response) {
          this.presentToast('bottom');
          this.router.navigate(['/login']);
        }
      },
      error: (e) => {
        if (e.error.violations.length) {
          e.error.violations.forEach(element => {
            this.errorsMsg.push(element.message);
          });
        }
      }
    })
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: `Création du compte effectuée, vous pouvez maintenant vous connecter`,
      duration: 5000,
      position: position,
      color: 'success',
      cssClass: 'my-toast'
    });

    await toast.present();
  }

}
