import { Component, ViewChild, OnInit, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReviewOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-review-order',
  templateUrl: 'review-order.html',
})
export class ReviewOrderPage implements OnInit{
  couponExpanded : boolean = false;
  @ViewChild("cc2") couponEntry : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer : Renderer) {
  }

  ngOnInit(){
    this.renderer.setElementStyle(this.couponEntry.nativeElement,"webkitTransition","max-height 500ms");
  }
  toggleCard(){
    if(this.couponExpanded){
      this.renderer.setElementStyle(this.couponEntry.nativeElement,"max-height","0px");
    }
    else{
      this.renderer.setElementStyle(this.couponEntry.nativeElement,"max-height","700px");

    }
    this.couponExpanded =  ! this.couponExpanded;

  }
  submitCoupon(){
      console.log(this.code);
  }

}
