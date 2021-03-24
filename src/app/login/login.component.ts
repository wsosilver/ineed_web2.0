import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { transition, trigger, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService],
  animations: [
    trigger('fadein', [
      state('void', style({opacity: 0})),
      transition('void => *', [
        style({ opacity: 0}),
        animate('900ms 300ms ease-out', style({opacity: 1}))
      ])
    ]),
    trigger('slidetodown', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(-150%)'}),
        animate('600ms 500ms ease-in', style({transform: 'translateY(0%)', opacity: 1}))
      ])
    ]),
  ]
})
export class LoginComponent implements OnInit {

  loading = false;
  loginForm: FormGroup;

  ERROR_MENSAGES
  SUCCESS_MENSAGES

  constructor(private loginService: LoginService, private formGroup: FormBuilder, private route: Router) { 
    this.loginForm = this.formGroup.group({
      email: ['', Validators.required],
      senha: ['', Validators.required]
    })
  }

  toggleLoadingAnimation() {
    this.loading = true;
    setTimeout(() => { 
      this.loading = false, 3000
    });
  }

  submit(){
    this.loading = true;

    this.loginService.login(this.loginForm.value).subscribe((data) => {
      console.log(data)
      this.route.navigateByUrl('/home')
      this.loading = false;
    }, e => {
      console.log(e)

      this.loading = false;
      let x = JSON.parse(e._body)

      x.error.forEach((everson, i) => {
        switch(everson) {
          case 'The Email field is required.' : x.error[i] = 'O Email é obrigatório'; break;
          case 'The Senha field is required.' : x.error[i] = 'A Senha é obrigatória'; break;
        }
      });

      this.ERROR_MENSAGES = x.error;

      if(e.status == 401) {
        let msg = JSON.parse(e._body)
        console.log(msg.message)
        this.ERROR_MENSAGES = msg.message;
      }

      setTimeout(() =>  { this.ERROR_MENSAGES = null }, 8000)
    });
  }

  ngOnInit() {
    
  }

}
