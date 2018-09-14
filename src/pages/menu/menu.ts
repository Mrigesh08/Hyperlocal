import { Component, ViewChild, Renderer, Renderer2, OnInit, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
// import { AccordionComponent } from '../../components/accordion/accordion';
import { ReviewOrderPage } from "../review-order/review-order";
import { HTTP } from '@ionic-native/http';
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
export class MenuPage implements OnInit{
  menuItems : any = [];
  cartItems : any = [];
  title : any;
  slides : any = [];
  outletData: any;
  reviewOrderPage : any = ReviewOrderPage;
  menuTabs : any;
  themeColor : any;
  @ViewChild( "cartButton", {read : ElementRef}) cartButton: ElementRef;
  @ViewChild( "myMenuTab" , {read : ElementRef} ) menuTabsTheme : ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer : Renderer, public renderer2 : Renderer2, public http: HTTP) {
    this.title = "Menu";
    this.outletData = navParams.get('data');
    // this.menuTabs = "burgers";
    this.themeColor = this.outletData.themeColor;
    console.log(this.outletData.name);
    // let x={
    //   icon : this.outletData.image,
    //   menuImage : this.outletData.menuImage,
    //   price : "Rs. 250",
    //   name  : "Name1",
    //   description : "1. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
    // }
    let y={
      title: "Welcome to the Docs!",
      image: this.outletData.menuImage,
    }
    for(let i=0;i<5;i++){
      // this.items.push(x);
      this.slides.push(y);
    }
    this.http.get('http://localhost:3000/getMenu',{"orgID" : "McD"}, {})
    .then(
      data => {
        console.log("datar");
        console.log(data.data);
        this.menuItems=JSON.parse(data.data);
        this.menuTabs=this.menuItems[0][0];
        console.log("MENUTABS="+this.menuTabs);
        console.log(this.menuItems[0]);

      }
    )
    .catch(
      error => {
        console.log(error);
      }
    );

  }

  ngOnInit(){
    // console.log(      this.menuTabsTheme.nativeElement.children[0]);
    this.renderer.setElementStyle(this.cartButton.nativeElement, "background-color" , this.themeColor);
    // this.menuTabs = this.menuItems[0][0];
    // this.renderer.addClass(this.menuTabsTheme.nativeElement.children[0].nativeElement,"segment active");
    // this.menuTabsTheme.nativeElement.children[0].class = "segment active";
    // this.renderer.setElementClass(this.menuTabsTheme.nativeElement.children[0], 'segment active', true);
    for(let i=0;i<this.menuTabsTheme.nativeElement.children.length ;i++){
      this.menuTabsTheme.nativeElement.children[i].style.color = this.themeColor;
      this.menuTabsTheme.nativeElement.children[i].style.borderBottomColor = this.themeColor;
    }
  }
  reviewOrder(){
    console.log("cartItems" + JSON.stringify(this.cartItems));
    this.navCtrl.push(this.reviewOrderPage, {
      data : this.cartItems
    });
  }
  contendChanged(val){
    this.menuTabs=val;
  }
  addItemToCart(i,j){
    console.log("i="+i+" j="+j);
    console.log("Added "+JSON.stringify(this.menuItems[i][1][j]));
    let x=JSON.parse(JSON.stringify(this.menuItems[i][1][j]));
    x["finalPrice"]=80;
    x["quantity"]=1;
    this.cartItems.push(x);
  }


}
