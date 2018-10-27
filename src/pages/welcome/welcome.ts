import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
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
  constructor(public userProvider: UserProvider, public navCtrl: NavController, public storage: Storage, public loadingController:LoadingController, public alertCtrt: AlertController) { }

  checkInput() : boolean {
    if(this.fullName == undefined || this.fullName == null || this.fullName == "") {
      this.alertCtrt.create({title : "Please enter your name."}).present();
      return false;
    }
    var regex = /^\d{10$/;
    if(this.phoneNumber == undefined || this.phoneNumber == null || regex.test(this.phoneNumber)) {
      this.alertCtrt.create({title: "Please enter a ten digit phone number."}).present();
      return false;
    }
    if(this.password == undefined || this.password == null || this.password.length < 8 || this.password.length > 16) {
      this.alertCtrt.create({title: "Please enter a password of length between 8 and 16 characters."}).present();
      return false;
    }
    return true;
  }

  async signup() {
    if(!this.checkInput()) return;
    let loading = this.loadingController.create({content : "Hold up!"});
    loading.present();
    if(await this.userProvider.checkAccount(this.phoneNumber)) {
      loading.dismissAll();
      this.alertCtrt.create({title : "An account with the given phone number already exits."}).present();
      return;
    }
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
  }
}
