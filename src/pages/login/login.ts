import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public phoneNumber: string;
  public password: string;
  
  constructor(public userProvider: UserProvider) {
    this.phoneNumber = "+91";
  }

  login() {
    this.userProvider.signIn(this.phoneNumber, this.password);
  }
}
