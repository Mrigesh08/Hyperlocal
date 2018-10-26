import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import { User } from '../../models/customers';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  public user: User;
  constructor(public storage: Storage) {}
  signUp(phoneNumber: string, fullName: string, password: string): Promise<void> {
    var promises = [
      firebase.database().ref('/users/' + phoneNumber + '/phoneNumber').set(phoneNumber)
        .then(() => console.log("Sign Up successful.")),
      firebase.database().ref('/users/' + phoneNumber + '/fullName').set(fullName)
        .then(() => console.log("Setting fullName successful.")),
      firebase.database().ref('/users/' + phoneNumber + '/password').set(password)
        .then(() => console.log("Setting password successful."))]
    return Promise.all(promises).then(async () => {
      this.user = await User.getUser(firebase.database().ref('/users/'+phoneNumber));
    });
  }
  login(phoneNumber: string, password: string): Promise<boolean> {
    return firebase.database().ref('/users/' + phoneNumber + '/password').once("value")
      .then(res => res.val() == password)
      .then(async val => {
        if(val) this.user = await User.getUser(firebase.database().ref('/users/'+phoneNumber)); 
        return val;
      })
  }
}
