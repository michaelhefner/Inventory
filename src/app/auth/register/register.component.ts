import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl('', Validators.email),
    fullName: new FormControl(''),
    confirmPassword: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  register() {
    this.authService.registerUser({
      email: this.registerForm.value.email,
      name: this.registerForm.value.fullName,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword
    })
      .subscribe(result => {
        console.log(result);
        if (result) {
          this.router.navigate(['active-logs']);
        }
      });
    // .then(success => !success['code'] ? this.router.navigate(['']) : null).catch(error => console.log(error));
  }

}


