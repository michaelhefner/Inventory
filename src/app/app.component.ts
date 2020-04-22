import {Component} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {AuthService} from './auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Inventory';
  // Your web app's Firebase configuration
  firebaseConfig = {
    apiKey: 'AIzaSyBKSMOziyBnhbR_xrMwwEcTLiAw4GgjLnQ',
    authDomain: 'michaelhefner-inventory.firebaseapp.com',
    databaseURL: 'https://michaelhefner-inventory.firebaseio.com',
    projectId: 'michaelhefner-inventory',
    storageBucket: 'michaelhefner-inventory.appspot.com',
    messagingSenderId: '1035562750460',
    appId: '1:1035562750460:web:7cf51c8bc1172db9e12279'
  };

  constructor(private authService: AuthService, private router: Router) {
    firebase.initializeApp(this.firebaseConfig);
    authService.authStateListener();
    // console.log(authService.authStateListener());
    // this.authService.registerUser('michael@michaelhefner.com', 'testpassword');
    /*
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        // User is signed in.
        const displayName = user.displayName;
        const email = user.email;
        const emailVerified = user.emailVerified;
        const photoURL = user.photoURL;
        const isAnonymous = user.isAnonymous;
        const uid = user.uid;
        const providerData = user.providerData;
        // ...
      } else {
        // User is signed out.
        // ...
      }
          });

     */
  }

}
