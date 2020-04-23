import {Component} from '@angular/core';
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
export class AppComponent {
  title = 'Inventory';

  constructor(private authService: AuthService, private router: Router) {
    firebase.initializeApp(ConfigFile.firebaseConfig);
    authService.authStateListener();
  }

}
