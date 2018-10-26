import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';
import * as firebase from 'firebase';
import { UserProvider } from '../../providers/user/user';
import { MorphlistPage } from '../morphlist/morphlist';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
  public phoneNumber: string;
  public fullName: string;
  public password: string;
  constructor(public userProvider: UserProvider, public navCtrl: NavController, public storage: Storage, public loadingController:LoadingController) { }

  signup() {
    let loading = this.loadingController.create({content : "Hold up!"});
    loading.present();
    var promise = this.userProvider.signUp(this.phoneNumber, this.fullName, this.password);
    promise.then(() => {
      loading.dismissAll();
      this.storage.set("user", {"phoneNumber" : this.phoneNumber, "fullName": this.fullName});
      this.navCtrl.setRoot(MorphlistPage);
    })
  }
  login(){
  	this.navCtrl.push(LoginPage);
  }
  ionViewDidLoad() {
    this.phoneNumber = '+91';
  }
}
