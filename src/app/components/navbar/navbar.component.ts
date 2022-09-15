import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { InfosService } from 'src/app/services/infos.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  uuid: string;
  isConnected: any;

  constructor(
    private servicInfosService: InfosService,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController) { }

  ngOnInit() {
    this.getId();
    this.authService.isAuthenticated.subscribe((connected) => {
      this.isConnected = connected;
    })
  }

  getId = async () => {
    const info = await this.servicInfosService.getId()
    this.uuid = info.uuid;
  }

  logout = () => {
    this.authService.logout();
    this.router.navigate(['/home']);
    this.presentToast('bottom');
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Déconnexion effectuée',
      duration: 2000,
      position: position,
      color: 'success',
    });

    await toast.present();
  }
}
