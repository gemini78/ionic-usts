import { Component, OnInit } from '@angular/core';
import { InfosService } from 'src/app/services/infos.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  uuid: string;
  constructor(private servicInfosService: InfosService) { }

  ngOnInit() {
    this.getId();
  }

  getId = async () => {
    const info = await this.servicInfosService.getId()
    this.uuid = info.uuid;
  }

}
