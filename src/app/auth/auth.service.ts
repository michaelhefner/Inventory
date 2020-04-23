import {EventEmitter, Injectable} from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private signedIn = false;
  private user = null;

  constructor(private router: Router) {
  }

  authStateListener() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.signedIn = true;
        this.user = user;
      } else {
        this.signedIn = false;
      }
    });
  }

  signIn(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(result => {
        if (result) {
          this.router.navigate(['']).catch(error => console.log(error));
        }
      });
  }

  listener(): EventEmitter<boolean> {
    const emitter = new EventEmitter<boolean>();
    firebase.auth().onAuthStateChanged(
      user => user ? emitter.emit(true) : emitter.emit(false));
    return emitter;
  }

  isAuthenticated() {
    return this.signedIn;
  }

  signOut() {
    firebase.auth().signOut()
      .then(() => this.router.navigate(['signin']))
      .catch(error => console.log(error));
  }

  registerUser(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(result => {
        this.signedIn = !!result;
        this.user = result;
        this.router.navigate([''])
          .catch(error => console.log(error));
      });
  }
}
