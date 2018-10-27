import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';

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
  @ViewChild(Slides) slides: Slides;
	outlets: any[] = [];
  displaySpinner : boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http : HTTP) {
    this.displaySpinner = true;
    this.http.get('http://theautomation.co.in/getOutlets/', {}, {})
    .then(
      data => {
        // console.log(data.data);
        let x = JSON.parse(data.data);
        for(let i=0; i<x.length ;i++){
          var newOrg={
            name: x[i].orgInfo.name,
            image : x[i].orgInfo.image,
            menuImage: x[i].orgInfo.menuImage,
            themeColor : x[i].orgInfo.themeColor,
            subtext : x[i].orgInfo.subtext
          };
          this.outlets.push(newOrg);
        }
        this.displaySpinner = false;
        // console.log(JSON.stringify(x));
      }
    )
    .catch(
      error => {
        this.displaySpinner = false;
        console.log(error);
      }
    );
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad MorphlistPage');
  // }
  ionViewDidLoad() {
    this.slides.stopAutoplay();
  }
  openPage(outlet){
    this.navCtrl.push(MenuPage , {
      data : outlet
    });
  }
}
