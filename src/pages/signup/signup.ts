import { Component } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  public phoneNumber: string;
  public fullName: string;
  public password: string;
  public state: string;
  public OTP: string;
  constructor(public userProvider: UserProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.phoneNumber = '+91';
    this.state = 'signup';
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {size: 'invisible'});
  }

  signup(): Promise<any> {
    if(this.state == 'signup')
      return this.userProvider.signUp(this.phoneNumber, this.recaptchaVerifier)
        .then(() => this.state = 'verifyOTP');
    else if(this.state == 'verifyOTP') {
      return this.userProvider.verifyOTP(this.OTP)
        .then(res => {
          if(res) this.state = 'fillProfile';
          else  this.alertCtrl.create({ title: "Invalid OTP." }).present(); // Invalid OTP
        });
    }
    else if(this.state == 'fillProfile') {
      return Promise.all([this.userProvider.setFullName(this.fullName),
        this.userProvider.setPassword(this.password)]);
    }
  }
}
