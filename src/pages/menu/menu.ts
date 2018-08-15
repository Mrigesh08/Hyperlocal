import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { AccordionComponent } from '../../components/accordion/accordion';
import { ReviewOrderPage } from "../review-order/review-order";
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
  title : any;
  slides : any[];
  reviewOrderPage : any = ReviewOrderPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.title = "Menu";
    this.items = [
      {
        image : "assets/imgs/Menu/yo.jpg",
        price : "Rs. 250",
        name  : "Name1",
        description : "1. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
      },
      {
        image : "assets/imgs/Menu/yo.jpg",
        price : "Rs. 550",
        name  : "Name2",
        description : "2. Lorem ipsum dolor sit amet, consectetur adipisicing elit."

      },
      {
        image : "assets/imgs/Menu/yo.jpg",
        price : "Rs. 550",
        name  : "Name2",
        description : "2. Lorem ipsum dolor sit amet, consectetur adipisicing elit."

      },
      {
        image : "assets/imgs/Menu/yo.jpg",
        price : "Rs. 550",
        name  : "Name2",
        description : "2. Lorem ipsum dolor sit amet, consectetur adipisicing elit."

      },
      {
        image : "assets/imgs/Menu/yo.jpg",
        price : "Rs. 550",
        name  : "Name2",
        description : "2. Lorem ipsum dolor sit amet, consectetur adipisicing elit."

      }
    ];
    this.slides = [
      {
        title: "Welcome to the Docs!",
        image: "assets/imgs/Menu/yo.jpg",
      },
      {
        title: "Welcome to the Docs!",
        image: "assets/imgs/Menu/yo.jpg",
      },
      {
        title: "Welcome to the Docs!",
        image: "assets/img/Menu/syo.jpg",
      }
    ];
  }


  reviewOrder(){
    this.navCtrl.push(this.reviewOrderPage);
  }



}
