import { Injectable } from '@angular/core';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export abstract class AbstractFirebaseService {

  protected ref: firebase.firestore.CollectionReference;

  constructor() {
    this.ref = firebase.firestore().collection(this.getCollectionName());
  }

  abstract getCollectionName(): string;
}
