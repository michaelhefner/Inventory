import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {AuthService} from './auth/auth.service';
import {ConfigFile} from '../configFile';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  signedIn = false;
  constructor(private authService: AuthService, private router: Router) {
    firebase.initializeApp(ConfigFile.firebaseConfig);
    authService.authStateListener();
  }

  ngOnInit(): void {
    console.log('ngoninit');
    this.router.navigate(['home']);
    this.authService.listener().subscribe(res => console.log(res));

  }

}
