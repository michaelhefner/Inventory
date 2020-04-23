import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  error = {code: '', message: ''};
  registerForm = new FormGroup({
    email: new FormControl('', Validators.email),
    // fullName: new FormControl(''),
    confirmPassword: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']).then(r => console.log(r));
    }
  }

  register() {
    if (this.registerForm.value.password === this.registerForm.value.confirmPassword) {
      this.authService.registerUser(this.registerForm.value.email, this.registerForm.value.password)
        .catch(error => this.error.message = error);
    }
  }

}


