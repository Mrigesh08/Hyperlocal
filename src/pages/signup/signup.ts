import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { UserProvider } from '../../providers/user/user';
import { MorphlistPage } from '../morphlist/morphlist';
import { Storage } from '@ionic/storage';
import { MenuPage } from '../menu/menu';

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
  public phoneNumber: string;
  public fullName: string;
  public password: string;
  constructor(public userProvider: UserProvider, public navCtrl: NavController, public storage: Storage) {
  }

  ionViewDidLoad() {
    this.phoneNumber = '+91';
  }

  signup() {
    var promise = this.userProvider.signUp(this.phoneNumber, this.fullName, this.password);
    promise.then(() => {
      this.storage.set("user", {"phoneNumber" : this.phoneNumber, "fullName": this.fullName});
      this.navCtrl.setRoot(MenuPage);
    })
  }
}
