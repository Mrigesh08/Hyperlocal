import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import {ReviewOrderPage} from '../review-order/review-order';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  menuPage(){
    this.navCtrl.push(MenuPage);
  }
  reviewPage(){
    this.navCtrl.push(ReviewOrderPage);
  }
}
