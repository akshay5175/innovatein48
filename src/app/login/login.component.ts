import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class AppLogin {
  loginFormGroup: FormGroup = new FormGroup({
    "username": new FormControl("", [Validators.required]),
    "password": new FormControl("", [Validators.required])
  });

  constructor(private router: Router, private authService: AuthService) { }

  login() {
    console.log(this.loginFormGroup.value);
    if (this.authService.authenticate(this.loginFormGroup.value.username, this.loginFormGroup.value.password)) {
      this.router.navigate(["home"]);
    }
  }
}
