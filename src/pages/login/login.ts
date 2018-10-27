import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserProvider } from '../../providers/user/user';
import { MorphlistPage } from '../morphlist/morphlist';
import { MenuPage } from '../menu/menu';

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
  phoneNumber: string;
  password: string;
  constructor(public userProvider: UserProvider, public navCtrl: NavController, public alertCtrl: AlertController, public storage: Storage, public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  checkInput() : boolean {
    var regex = /^\d{10}$/;
    if(this.phoneNumber == undefined || this.phoneNumber == null || !regex.test(this.phoneNumber)) {
      this.alertCtrl.create({title: "Please enter a ten digit phone number."}).present();
      return false;
    }
    if(this.password == undefined || this.password == null) {
      this.alertCtrl.create({title: "Please enter a password"}).present();
      return false;
    }
    return true;
  }

  async login() {
    if(!this.checkInput()) return;
    let loading = this.loadingController.create({content : "Hold up!"});
    loading.present();
    if(!await this.userProvider.checkAccount(this.phoneNumber)) {
      loading.dismissAll();
      this.alertCtrl.create({title : "An account with the given phone number does not exist."}).present();
      return;
    }
    this.userProvider.login(this.phoneNumber, this.password).then(val => {
      loading.dismissAll();
      if(val) {
        this.storage.set("user", {"phoneNumber" : this.phoneNumber, "fullName": this.userProvider.user.fullName});
        this.navCtrl.setRoot(MorphlistPage);
      }
      else  this.alertCtrl.create({title: "Invalid phone number or password..."}).present();
      console.log(val);
      console.log("Login Finished");
    })
  }

}
