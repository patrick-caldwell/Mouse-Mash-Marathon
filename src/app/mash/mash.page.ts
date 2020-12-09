import { Component, OnInit } from '@angular/core';
import { MashService } from '../services/mash.service';

@Component({
  selector: 'app-mash',
  templateUrl: './mash.page.html',
  styleUrls: ['./mash.page.scss'],
})
export class MashPage implements OnInit {
  public timer: any;
  public go: any = false;
  public count: any;
  public time: any;

  constructor(private mashService:MashService) {}

  ngOnInit() {
    this.timer = document.getElementById('timer');
    this.time = 10;
  }

  submitScore(){
    // let name = (<HTMLInputElement>document.getElementById('nameInput')).value;
    // let score = (<HTMLInputElement>document.getElementById('scoreInput')).value;
    let time = new Date();
    this.mashService.canSubmit(this.count, time);
  }

  startCountDown(){
    this.showSubmit(false);
    // document.getElementById('submit').style.display = "none";
    document.getElementById('submit').setAttribute("disabled", "true");
    document.getElementById('submit').setAttribute("color", "danger");
    document.getElementById('submit').innerHTML = "Finish The Game"
    // document.getElementById('nameInput').removeEventListener("input", this.showSubmit);
    
    document.getElementById('progress').setAttribute('value', '0');
    this.count = 0;
    document.getElementById('btn').setAttribute('disabled', 'true');

    this.timer.innerHTML = '3...';
    setTimeout(()=>{this.timer.innerHTML = '2...';}, 1000);
    setTimeout(()=>{this.timer.innerHTML = '1...';}, 2000);
    setTimeout(()=>{this.timer.innerHTML = 'Go!';}, 3000);
    setTimeout(()=>{this.startMash()}, 3000);
  }

  startMash(){
    this.go = true;
    let bar = document.getElementById('progress');
    let timer = setInterval(()=>{
      let count = parseFloat(bar.getAttribute('value'));
      bar.setAttribute('value', `${count += ((this.time/1000)/this.time)}`);

      if(count >= 1){clearInterval(timer); this.endMash();};
    }, this.time);

    document.body.onmouseup = (e)=>{
      if(this.go){
        this.count++;
        // document.getElementById('nameInput').innerHTML = this.count;
      }
    };
  }

  endMash(){
    this.timer.innerHTML = 'Game Over!';
    this.go = false;
    document.getElementById('btn').setAttribute('disabled', 'false');
    document.getElementById('submit').innerHTML = "Enter Your Name";
    // if((<HTMLInputElement>document.getElementById('nameInput')).value) this.showSubmit();
    this.showSubmit(true);
    // document.getElementById('nameInput').addEventListener("input", this.showSubmit);
  }

  showSubmit(check){
    if(check){
      document.getElementById('submit').setAttribute("disabled", "false");
      document.getElementById('submit').setAttribute("color", "success");
      document.getElementById('submit').innerHTML = "Submit Score"
    }
    else{
      document.getElementById('submit').setAttribute("disabled", "true");
      document.getElementById('submit').setAttribute("color", "danger");
      document.getElementById('submit').innerHTML = "Enter Your Name"
    }
  }

}
