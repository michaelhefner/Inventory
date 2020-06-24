import {Injectable} from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DbControllerService {
  private location = {collection: null, document: null};

  constructor(private httpClient: HttpClient) {
  }

  getPDFUrl(location: string) {
    console.log(location);
    return firebase.app().storage('gs://michaelhefner-inventory.appspot.com/').ref()
      .child(location)
      .getDownloadURL().then((url) => {
        return url;
      });
  }

  setLocation(user) {
    this.location.collection = 'inventory';
    this.location.document = user.email;
  }

  insert(data, fileToUpload?: File) {
    this.setLocation(firebase.auth().currentUser);
    const insertPromise = (dataToInsert) => {
      firebase.firestore()
        .collection(this.location.collection)
        .doc(this.location.document)
        .collection('parts')
        .add(dataToInsert)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    };
    if (fileToUpload) {
      this.uploadFile(fileToUpload, data.name).then((path) => {
        data.imageFile = path;
        return data;
      })
        .then(res => insertPromise(res)).catch(error => console.log(error));
    } else {
      insertPromise(data);
    }
  }

  uploadFile(fileToUpload: File, location: string) {
    return this.getGroupID()
      .then(res => {
        console.log(res);
        return firebase.app().storage('gs://michaelhefner-inventory.appspot.com/')
          .ref().child(`${res}/${location}/${fileToUpload.name}`)
          .put(fileToUpload)
          .then((snapshot) => {
            return snapshot.metadata.fullPath;
          });
      });
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
          console.log(item.data());
          returnObj.push({
            id: item.id,
            name: item.data().name,
            minStock: item.data().minStock,
            currentQuantity: item.data().currentQuantity,
            description: item.data().description,
            location: item.data().location,
            imageFile: item.data().imageFile ? this.getPDFUrl(`${item.data().imageFile}`) : '',
            manPartNumber: item.data().manPartNumber
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

  getGroupID() {
    const user = firebase.auth().currentUser;
    this.setLocation(user);

    return firebase.firestore()
      .collection(this.location.collection)
      .doc('userData')
      .collection('users')
      .get()
      .then(doc => {
        let groupID = '';
        doc.docs.forEach(userEntry => {
          if (userEntry.data().user.toString() === user.email) {
            groupID = userEntry.data().groupID;
          }
        });
        return groupID;
      }).catch(err => console.log(err));
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
