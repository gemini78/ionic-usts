import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  onSubmit = () => {
    console.log(this.credentials);
    this.authService.login(this.credentials).subscribe( (ObjectToken:any) => {
      if (ObjectToken) {
        this.authService.setToken(ObjectToken.token).then( (token: string)=>{
          if(token) {
            this.router.navigate(['/informations']);
          }            
        })   
      }
    })
  }
  
}
