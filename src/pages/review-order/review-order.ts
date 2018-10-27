import { Component, ViewChild, OnInit, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { Toast } from '@ionic-native/toast';
import { LoadingController } from 'ionic-angular';
import { MorphlistPage } from '../morphlist/morphlist';
import { Storage } from '@ionic/storage';

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
  orgName : string = "";
  cartTotal : number = 0;
  user : any;
  code : string;
  @ViewChild("cc2") couponEntry : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer : Renderer, public http: HTTP, public toast:Toast, public loadingController:LoadingController,private storage: Storage) {
    this.cartItems = navParams.get("data");
    storage.get("user").then((val)=>{
      this.user = val;
    });
    if(!this.cartItems){
      this.cartItems = [];
    }
    this.orgName = navParams.get("orgID");
    let sum=0;
    let i=0;
    for(i=0;i<this.cartItems.length;i++){
      sum+= (this.cartItems[i].quantity )*( this.cartItems[i].finalPrice );
    }
    this.cartTotal = sum;
  }

  ngOnInit(){
    // this.renderer.setElementStyle(this.couponEntry.nativeElement,"webkitTransition","max-height 500ms");

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
  sendOrder(){
    let orderOptions = {
      orgID : this.orgName,
      userName : this.user.fullName,
      userPhone : this.user.phoneNumber,
      items : JSON.stringify(this.cartItems)
    };
    let loading = this.loadingController.create({content : "Sending your order right away!"});
    loading.present();
    this.http.get('http://contentholmes.com/addOrder/', orderOptions, {})
    .then(
      data => {
        // console.log(data.data);
        loading.dismissAll();
        let x = JSON.parse(data.data);
        if(x.success){
          this.cartItems.splice(0, this.cartItems.length);
          this.cartTotal = 0;
          this.toast.show("Your order has been placed", "3000", "bottom").subscribe(
            toast => {
              console.log(toast);
              this.navCtrl.setRoot(MorphlistPage);
            }
          );
        }
        else{
          this.toast.show("Your order could not be placed. Please try again.", "1000", "center").subscribe(
            toast => {
              console.log(toast);
            }
          );
        }
      }
    )
    .catch(
      error => {
        loading.dismissAll();
        console.log(error);
      }
    );
  }
}
