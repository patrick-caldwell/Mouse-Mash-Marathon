import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MashPageRoutingModule } from './mash-routing.module';

import { MashPage } from './mash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MashPageRoutingModule
  ],
  declarations: [MashPage]
})
export class MashPageModule {}
