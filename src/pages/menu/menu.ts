import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { ExpandableComponent } from '../../components/expandable/expandable'
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
  className : any;
  expandToggle: any= [];
  expandHeight : number = 100;
  // k : number =0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.title = "Menu";
    this.className = "Hi";
    this.items = [
      {
        image : "../../assets/imgs/Menu/yo.jpg",
        price : "Rs. 250",
        name  : "Name1",
        description : "1. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
      },
      {
        image : "../../assets/imgs/Menu/yo.jpg",
        price : "Rs. 550",
        name  : "Name2",
        description : "2. Lorem ipsum dolor sit amet, consectetur adipisicing elit."

      },
      {
        image : "../../assets/imgs/Menu/yo.jpg",
        price : "Rs. 550",
        name  : "Name2",
        description : "2. Lorem ipsum dolor sit amet, consectetur adipisicing elit."

      },
      {
        image : "../../assets/imgs/Menu/yo.jpg",
        price : "Rs. 550",
        name  : "Name2",
        description : "2. Lorem ipsum dolor sit amet, consectetur adipisicing elit."

      },
      {
        image : "../../assets/imgs/Menu/yo.jpg",
        price : "Rs. 550",
        name  : "Name2",
        description : "2. Lorem ipsum dolor sit amet, consectetur adipisicing elit."

      }
    ];
    this.expandToggle = [
      false,
      false,
      false,
      false,
      false
    ];
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad MenuPage');
  // }
  expandCard(i) {
    var k=0;
    for(k=0;k<2;k++){
      if(i==k){
        this.expandToggle[k]=!this.expandToggle[k];
        this.className="animated slideInDown";
      }
      else{
        this.expandToggle[k]=false;
      }
    }
  }

}
