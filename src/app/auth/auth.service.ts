import {Injectable} from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import {Router} from '@angular/router';
import {DbControllerService} from '../db/db-controller.service';
import {Observable, Subject} from 'rxjs';
import {ConfigFile} from '../../configFile';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private signedIn = false;
  private user = null;

  private userSubject = new Subject();

  constructor(private router: Router, private dbControllerService: DbControllerService) {
    firebase.initializeApp(ConfigFile.firebaseConfig);
    this.authStateListener();
  }

  authStateListener() {
    return firebase.auth().onAuthStateChanged(user => {
      this.userSubject.next(!!user);
      this.signedIn = !!user;
      this.user = user || null;
    });
  }

  signIn(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(result => {
        if (result) {
          this.user = result.user;
          console.log(result.user.toJSON());
          this.router.navigate(['home']).catch(error => console.log(error));
        }
      });
  }

  listener(): Observable<any> {
    return this.userSubject.asObservable();
  }

  isAuthenticated() {
    return this.signedIn;
    // return this.userSubject.asObservable();
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
              console.log(idExists ? 'Group id exists already' : '');
              if (!idExists) {
                this.dbControllerService.insertUserIntoDB(this.user, uniqueGroupID, !idExists).then(nextRes => {
                  console.log(nextRes);
                  if (!nextRes) {
                    firebase.auth().currentUser.delete().catch(err => console.log(err));
                    reject('Group Id already exists');
                  } else {
                    this.router.navigate(['home'])
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
