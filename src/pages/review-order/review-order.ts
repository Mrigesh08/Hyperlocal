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
  cartItems : any = [];
  cartTotal : number = 0;
  code : string;
  @ViewChild("cc2") couponEntry : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer : Renderer) {
    this.cartItems = navParams.get("data");
    let sum=0;
    let i=0;
    for(i=0;i<this.cartItems.length;i++){
      sum+= (this.cartItems[i].quantity )*( this.cartItems[i].finalPrice );
    }
    this.cartTotal = sum;
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
  removeItem(i){
    // console.log("removeiong "+i);
    this.cartTotal -= ( this.cartItems[i].quantity ) * ( this.cartItems[i].finalPrice );
    this.cartItems.splice(i,1);
  }
  increaseQuantity(i){
    console.log("increasing "+i);
    this.cartItems[i].quantity = this.cartItems[i].quantity+1;
    this.cartTotal += this.cartItems[i].finalPrice;
  }
  decreaseQuantity(i){
    if(this.cartItems[i].quantity != 1){
      this.cartItems[i].quantity = this.cartItems[i].quantity-1;
      this.cartTotal -= this.cartItems[i].finalPrice;
    }
  }
}
