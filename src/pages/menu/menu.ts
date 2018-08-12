import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  items : any[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items = [
      {
        image : "imgs/Menu/yo.png",
        price : "Rs. 250",
        name  : "Name1",
        description : "1. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
      },
      {
        image : "imgs/Menu/yo.png",
        price : "Rs. 550",
        name  : "Name2",
        description : "2. Lorem ipsum dolor sit amet, consectetur adipisicing elit."

      }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
