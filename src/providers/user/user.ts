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
  private result: firebase.auth.ConfirmationResult;
  public user: User;

  constructor(public storage: Storage) {}
  async isAuthenticated(): Promise<User> {
    var user = firebase.auth().currentUser;
    if(user !== null)
      return await User.getUser(firebase.database().ref('/users').child(user.uid));
    else return null;
  }
  async isProfileComplete(): Promise<boolean> {
    var userId = firebase.auth().currentUser.uid;
    var name = await firebase.database().ref('/users/'+userId+'/fullName').once('value').then(snap => snap.val());
    return (!(name == null || name == "" || name == undefined));
  }
  signUp(phoneNumber: string, recaptchaVerfier: firebase.auth.RecaptchaVerifier): Promise<any> {
    console.log("Sending OTP....");
    return firebase.auth().signInWithPhoneNumber(phoneNumber, recaptchaVerfier)
      .then(result => {
        this.result = result;
        console.log("OTP Sent...");
      });
  }
  verifyOTP(OTP: string): Promise<boolean> {
    console.log("Verifying OTP...")
    return this.result.confirm(OTP)
      .then(async result => {
        console.log("OTP Verified.");
        this.result = null;
        this.user = await User.getUser(firebase.database().ref('/users').child(result.user.uid));
        this.storage.set("loggedInAlready", true);
        var ref = firebase.database().ref('/users').child(result.user.uid);
        return Promise.all([ref.child('userId').set(result.user.uid), ref.child('phoneNumber').set(result.user.phoneNumber)]);
      })
      .then(snap => true)
      .catch(err => false);
  }
  setFullName(fullName: string): Promise<any> {
    console.log("Setting fullName...");
    return firebase.database().ref('/users/' + this.user.userId + '/fullName').set(fullName)
      .then(snap => this.user.fullName = fullName)
      .then(() => console.log("Setting fullName successful."));
  }
  setPassword(password: string): Promise<any> {
    console.log("Setting password...");
    return firebase.database().ref('/users/' + this.user.userId + '/password').set(password)
      .then(() => console.log("Setting password successful."));
  }
}
