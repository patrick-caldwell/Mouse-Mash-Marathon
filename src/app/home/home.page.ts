import { Component } from '@angular/core';
import { MashService } from '../services/mash.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public mashService:MashService) {
    this.getRecords();
  }

  getRecords(): void{
    this.mashService.getRecords();
  }

  isTopThree(index): boolean{
    if(index < 3) return true;
    return false;
  }

  signout():void{
    this.mashService.signout();
  }

}
