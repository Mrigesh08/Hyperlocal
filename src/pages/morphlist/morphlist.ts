import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
/**
 * Generated class for the MorphlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-morphlist',
  templateUrl: 'morphlist.html',
})
export class MorphlistPage {

	outlets: any[] = [
		{
			name: "PIZZACO",
			image: "https://corporate.dominos.co.uk/Media/Default/Image%20Library/Image%20library%20-%20logos/RGB_White_Type_Tile_Only_Small.png",
      menuImage : "assets/imgs/Menu/dominos.jpg",
      themeColor : "#0078AC",
			subtext: "Pizzas!!!",
		},
		{
			name: "BURGERCO",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/220px-McDonald%27s_Golden_Arches.svg.png",
      menuImage : "assets/imgs/Menu/McD.jpg",
      themeColor : "#FFF10A",
      subtext: "Burgers!!!",
		},
		{
			name: "CHICKENCO",
			image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/1200px-KFC_logo.svg.png",
      menuImage : "assets/imgs/Menu/KFC.jpg",
      themeColor : "#A3080C",
      subtext: "Chicken!!!",
		},
	]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MorphlistPage');
  }

  openPage(outlet){
    this.navCtrl.push(MenuPage , {
      data : outlet
    });
  }
}
