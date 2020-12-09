import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MashPage } from './mash.page';

const routes: Routes = [
  {
    path: '',
    component: MashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MashPageRoutingModule {}
