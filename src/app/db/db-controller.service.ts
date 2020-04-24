import {Injectable} from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class DbControllerService {

  constructor() {
  }

  insert(data: object) {
    firebase.firestore()
      .collection(firebase.auth().currentUser.email)
      .doc('inventory')
      .collection('parts')
      .add(data)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  select(collection: string) {
    console.log(firebase.auth().currentUser.email);
    return firebase.firestore()
      .collection(firebase.auth().currentUser.email)
      .doc('inventory')
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
        return returnObj;
      });
  }

  delete(collection: string, id: string) {
    return firebase.firestore()
      .collection(firebase.auth().currentUser.email)
      .doc('inventory')
      .collection(collection)
      .doc(id)
      .delete()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
}
