import {EventEmitter, Injectable} from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import {Router} from '@angular/router';
import {DbControllerService} from '../db/db-controller.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private signedIn = false;
  private user = null;

  // private admin = firebase.auth();

  constructor(private router: Router, private dbControllerService: DbControllerService) {
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
          this.user = result.user;
          console.log(result.user.toJSON());
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
      .then(() => this.router.navigate(['sign_in']))
      .catch(error => console.log(error));
  }

  registerUser(email: string, password: string, uniqueGroupID: string) {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(result => {
          this.signedIn = !!result;
          this.user = result.user;
          return result.user;
        })
        .then(user => {
          this.dbControllerService.groupIDPresent(user, uniqueGroupID)
            .then(idExists => {
              console.log('id exists' + idExists);
              if (!idExists) {
                this.dbControllerService.insertUserIntoDB(this.user, uniqueGroupID, !idExists).then(nextRes => {
                  console.log(nextRes);
                  if (!nextRes) {
                    firebase.auth().currentUser.delete().catch(err => console.log(err));
                    reject('Group Id already exists');
                  } else {
                    this.router.navigate([''])
                      .catch(error => console.log(error));
                    resolve('success');
                  }
                }).catch(err => reject(err));
              } else {
                firebase.auth().currentUser.delete().catch(err => console.log(err));
                reject('Group Id already exists');
              }
            })
            .catch(err => console.log(err));
        });
    });
  }
}
