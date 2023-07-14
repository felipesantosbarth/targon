import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContratarPage } from './contratar.page';

const routes: Routes = [
  {
    path: '',
    component: ContratarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContratarPageRoutingModule {}
