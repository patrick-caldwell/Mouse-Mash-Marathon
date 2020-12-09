import { Component, OnInit } from '@angular/core';
import { MashService } from '../services/mash.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{

  constructor(private mashService:MashService) {
  }

  ngOnInit(){
    document.getElementById('emailLogin').addEventListener('input', this.canSignin);
    document.getElementById('passwordLogin').addEventListener('input', this.canSignin);

    document.getElementById('emailReg').addEventListener('input', this.canRegister);
    document.getElementById('passwordReg').addEventListener('input', this.canRegister);
    document.getElementById('nameReg').addEventListener('input', this.canRegister);
  }

  canSignin(){
    let emailLogin =  (<HTMLInputElement>document.getElementById('emailLogin'));
    let passwordLogin = (<HTMLInputElement>document.getElementById('passwordLogin'));
    let buttonLogin = document.getElementById('buttonLogin');

    if(emailLogin.value.length > 0 && passwordLogin.value.length > 0){
      buttonLogin.setAttribute('color', 'success');
      buttonLogin.setAttribute('disabled', 'false');
    }else{
      buttonLogin.setAttribute('color', 'danger');
      buttonLogin.setAttribute('disabled', 'true');
    }
  }

  signin(){
    let email =  (<HTMLInputElement>document.getElementById('emailLogin')).value;
    let password = (<HTMLInputElement>document.getElementById('passwordLogin')).value;
    this.mashService.signin(email, password);
  }

  canRegister(){
    let emailReg =  (<HTMLInputElement>document.getElementById('emailReg'));
    let nameReg = (<HTMLInputElement>document.getElementById('nameReg'));
    let passwordReg = (<HTMLInputElement>document.getElementById('passwordReg'));
    let buttonLogin = document.getElementById('buttonReg');

    if(emailReg.value.length > 0 && passwordReg.value.length > 0 && nameReg.value.length > 0){
      buttonLogin.setAttribute('color', 'success');
      buttonLogin.setAttribute('disabled', 'false');
    }else{
      buttonLogin.setAttribute('color', 'danger');
      buttonLogin.setAttribute('disabled', 'true');
    }
  }

  register(){
    let email =  (<HTMLInputElement>document.getElementById('emailReg')).value;
    let password = (<HTMLInputElement>document.getElementById('passwordReg')).value;
    let name = (<HTMLInputElement>document.getElementById('nameReg')).value;
    this.mashService.register(email, password, name);
  }

}
