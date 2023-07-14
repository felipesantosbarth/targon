import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { ComponentsModule } from '../components/components.module';

import { ContratarPage } from './contratar.page';
import { ContratarPageRoutingModule } from './contratar-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,  
    ComponentsModule,
    ContratarPageRoutingModule
    // RoleListComponent
  ],
  // declarations: [ContratarPage, RoleListComponent],
  declarations: [ContratarPage],
})
export class ContratarPageModule {}
