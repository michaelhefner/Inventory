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
  registerForm: FormGroup;
  groupStyle: string;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', Validators.email),
      uniqueGroupID: new FormControl('', Validators.minLength(1)),
      confirmPassword: new FormControl('', Validators.minLength(6)),
      password: new FormControl('', Validators.minLength(6)),
    });
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['home']).then(r => console.log(r));
    }
  }

  register() {
    if (this.registerForm.value.password === this.registerForm.value.confirmPassword
      && this.registerForm.status === 'VALID') {
      this.authService.registerUser(this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.uniqueGroupID)
        .catch(error => {
          this.error.message = error;
          this.groupStyle = 'red';
        });
    }
  }

}


