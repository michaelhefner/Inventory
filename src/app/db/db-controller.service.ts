import {Injectable} from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class DbControllerService {
  private location = {collection: null, document: null};

  constructor() {
  }

  setLocation(user) {
    this.location.collection = 'inventory';
    this.location.document = user.email;
    console.log(this.location);
  }


  insert(data: object) {
    this.setLocation(firebase.auth().currentUser);
    firebase.firestore()
      .collection(this.location.collection)
      .doc(this.location.document)
      .collection('parts')
      .add(data)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  select(collection: string) {
    this.setLocation(firebase.auth().currentUser);
    return firebase.firestore()
      .collection(this.location.collection)
      .doc(this.location.document)
      .collection(collection)
      .get().then(doc => {
        const returnObj = [];
        doc.forEach(item => {
          returnObj.push({
            id: item.id,
            name: item.data().name,
            minStock: item.data().minStock,
            currentQuantity: item.data().currentQuantity,
            description: item.data().description,
            location: item.data().location,
            partNumber: item.data().partNumber
          });
        });
        console.log(returnObj);
        return returnObj;
      });
  }

  delete(collection: string, id: string) {
    this.setLocation(firebase.auth().currentUser);
    return firebase.firestore()
      .collection(this.location.collection)
      .doc(this.location.document)
      .collection(collection)
      .doc(id)
      .delete()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }


  /*
  Group ID can only be generated once and needs to be unique
  If group ID is already generated, a request to join is required
   */
  groupIDPresent(user, groupId): Promise<any> {
    this.setLocation(user);
    return firebase.firestore()
      .collection(this.location.collection)
      .doc(groupId)
      .collection('authorizedUsers')
      .get().then(doc => {
        return !doc.empty;
      }).catch(err => console.log(err));
  }

  /*
  Inserting user information into the group ID location,
  for future authorized user reference.
   */
  insertUserIntoDB(user, groupId) {
    this.setLocation(user);
    return firebase.firestore()
      .collection(this.location.collection)
      .doc(groupId)
      .collection('authorizedUsers')
      .add({user: user.email})
      .then(doc => {
        return doc;
      }).catch(err => {
        firebase.firestore().collection(this.location.collection).add({name: document}).catch((error) => console.log(error));
        return false;
      });
  }
}
