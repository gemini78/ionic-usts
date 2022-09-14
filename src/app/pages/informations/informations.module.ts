import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformationsPageRoutingModule } from './informations-routing.module';

import { InformationsPage } from './informations.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformationsPageRoutingModule,
    SharedModule,
  ],
  declarations: [InformationsPage]
})
export class InformationsPageModule {}
