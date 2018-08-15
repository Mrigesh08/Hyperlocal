import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
			name: "Dominos",
			image: "https://corporate.dominos.co.uk/Media/Default/Image%20Library/Image%20library%20-%20logos/RGB_White_Type_Tile_Only_Small.png",
			subtext: "Pizzas!!!",
		},
		{
			name: "McDonald's",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Mcdonald%27s_logo.svg/2000px-Mcdonald%27s_logo.svg.png",
			subtext: "Burgers!!!",
		},
		{
			name: "KFC",
			image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/1200px-KFC_logo.svg.png",
			subtext: "Chicken!!!",
		},
	]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MorphlistPage');
  }

}
