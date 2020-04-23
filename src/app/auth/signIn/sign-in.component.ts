import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SignInComponent implements OnInit {

  errorMessage: string;
  signInForm = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']).then(r => console.log(r));
    }
  }

  signIn() {
    this.authService.signIn(this.signInForm.value.email, this.signInForm.value.password)
      .catch(error => this.errorMessage = error.toString());
  }

}


