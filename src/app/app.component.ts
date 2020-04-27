import {Component} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {AuthService} from './auth/auth.service';
import {ConfigFile} from '../configFile';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  constructor(private authService: AuthService) {
    firebase.initializeApp(ConfigFile.firebaseConfig);
    authService.authStateListener();
  }

}
