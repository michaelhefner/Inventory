import {Injectable} from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DbControllerService {
  private location = {collection: null, document: null};

  constructor(private httpClient: HttpClient) {
  }

  // uploadImage(formData: FormData) {
  //   console.log(formData);
  //   this.httpService.post('http://127.0.0.1:3000/upload-image', formData).subscribe(obs => {
  //     console.log(obs);
  //   });
  // }
  postFile(fileToUpload: File) {
    const endpoint = 'http://127.0.0.1:3000/upload-image';
    const formData: FormData = new FormData();
    formData.append('imageFile', fileToUpload, fileToUpload.name);
    this.httpClient
      .post(endpoint, formData).subscribe(obs => {
      console.log(obs);
    });
  }

  setLocation(user) {
    this.location.collection = 'inventory';
    this.location.document = user.email;
    // console.log(this.location);
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
    this.getGroupID();

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
            manPartNumber: item.data().manPartNumber
          });
        });
        // console.log(returnObj);
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

  getGroupID() {
    // firebase.firestore().collection(this.location.collection).
  }

  /*
  Group ID can only be generated once and needs to be unique
  If group ID is already generated, a request to join is required
   */
  groupIDPresent(user, groupId): Promise<any> {
    this.setLocation(user);
    return firebase.firestore()
      .collection(this.location.collection)
      .doc('userData')
      .collection('groups')
      .get()
      .then(doc => {
        let exists = false;
        doc.docs.forEach(name => {
          console.log('group id exists ' + (name.data().name.toString() === groupId));
          if (name.data().name.toString() === groupId) {
            exists = true;
          }
        });
        return exists;
      }).catch(err => console.log(err));
  }

  /*
  Inserting user information into the group ID location,
  for future authorized user reference.
   */
  insertUserIntoDB(user, groupId: string, isGroupCreator: boolean) {
    this.setLocation(user);
    return firebase.firestore()
      .collection(this.location.collection)
      .doc('userData')
      .collection('users')
      .add({
        user: user.email,
        groupID: groupId,
        isCreator: isGroupCreator
      })
      .then(res => {
        console.log(res);
        firebase.firestore()
          .collection(this.location.collection)
          .doc('userData')
          .collection('groups')
          .add({
            name: groupId,
            authorizedUsers: user.email
          })
          .catch(error => console.log(error));
        return true;
      })
      .catch(err => {
        firebase.firestore().collection(this.location.collection).add({name: document}).catch((error) => console.log(error));
        return false;
      });
  }
}
