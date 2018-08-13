import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { User } from '../../models/user';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  private result: firebase.auth.ConfirmationResult;
  public user: User;
  isAuthenticated(): User {
    var user = firebase.auth().currentUser;
    var profile;
    if(user !== null) {
      firebase.database().ref('/users').child(user.uid).once('value').then(snap => profile = snap.val());
      return new User(user.uid, profile.fullName, user.phoneNumber);
    }
  }
  signIn(phoneNumber: string, password: string) {
    console.log("Logging In...");
    
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
      .then(result => {
        console.log("OTP Verified.");
        this.result = null;
        this.user = new User(result.user.uid, "", result.user.phoneNumber);
        return firebase.database().ref('/users').child(result.user.uid)
          .set({ userId: result.user.uid, phoneNumber: result.user.phoneNumber });
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
