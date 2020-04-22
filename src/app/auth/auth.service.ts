import {EventEmitter, Injectable} from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private signedIn = false;

  constructor() {

  }

  authStateListener() {
    firebase.auth().onAuthStateChanged(user => {
      // console.log('authStateChange:   ' + (user ? user.email : this.signedIn));
      this.signedIn = user ? true : false;
    });
  }

  signin(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  listener(): EventEmitter<boolean> {
    const emitter = new EventEmitter();
    firebase.auth().onAuthStateChanged(user => user ? emitter.emit(true) : emitter.emit(false));
    return emitter;
  }

  isAuthenticated() {
    return this.signedIn;
  }

  isSignedIn() {

  }

  signOut() {
    firebase.auth().signOut().then(result => console.log('Logged Out'));
  }

  getCurrentUser() {

  }

  registerUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }
}
