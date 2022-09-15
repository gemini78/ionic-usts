import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router
    ) { }

  ngOnInit() {
  }

  onSubmit = () => {
    console.log(this.user);
    this.authService.register(this.user).subscribe({
      next: (response) => {
        this.errorsMsg = [];
        if(response) {
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

}
