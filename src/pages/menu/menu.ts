import { Component, ViewChild, Renderer, Renderer2, OnInit, ElementRef, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';
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

  categoryTabs : string = "";
  title : any;
  slides : any = [];
  outletData: any;
  reviewOrderPage : any = ReviewOrderPage;
  menuTabs : any;
  themeColor : any;
  @ViewChild( "cartButton", {read : ElementRef}) cartButton: ElementRef;
  @ViewChild( "myMenuTab" , {read : ElementRef} ) menuTabsTheme : ElementRef;
  @ViewChild( "addButton" , {read : ElementRef} ) myAddButton : ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer : Renderer, public renderer2 : Renderer2, public http: HTTP, @Inject(DOCUMENT) document) {

    this.title = "Menu";
    this.outletData = navParams.get('data');
    // this.menuTabs = "burgers";
    this.themeColor = this.outletData.themeColor;
    this.categoryTabs=this.outletData.name;
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
    this.http.get('http://contentholmes.com/getMenu',{"orgID" : this.outletData.name}, {})
    .then(
      data => {
        console.log("datar");
        console.log(data.data);
        this.menuItems=JSON.parse(data.data);
        this.menuTabs=this.menuItems[0][0];
        console.log("MENUTABS="+this.menuTabs);
        console.log(this.menuItems[0]);

        for(let i=0;i<this.menuTabsTheme.nativeElement.children.length ;i++){
          this.menuTabsTheme.nativeElement.children[i].style.color = this.themeColor;
          this.menuTabsTheme.nativeElement.children[i].style.borderBottomColor = this.themeColor;
        }
        // document.getElementById('burgers').nativeElement.style.color = this.themeColor;
        // this.renderer.setElementStyle(document.getElementById('burgers').nativeElement, "color" , this.themeColor);

      }
    )
    .catch(
      error => {
        console.log(error);
      }
    );
    // this.renderer.setElementStyle(this.myAddButton.nativeElement,"color", this.themeColor);
  }

  ngOnInit(){
    // console.log( "Menu tabs theme" +     JSON.stringify(this.menuTabsTheme.nativeElement));
    this.renderer.setElementStyle(this.cartButton.nativeElement, "background-color" , this.themeColor);
    // this.menuTabs = this.menuItems[0][0];
    // this.renderer.addClass(this.menuTabsTheme.nativeElement.children[0].nativeElement,"segment active");
    // this.menuTabsTheme.nativeElement.children[0].class = "segment active";
    // this.renderer.setElementClass(this.menuTabsTheme.nativeElement.children[0], 'segment active', true);

  }
  reviewOrder(){
    console.log("cartItems" + JSON.stringify(this.cartItems));
    this.navCtrl.push(this.reviewOrderPage, {
      data : this.cartItems,
      orgID : this.outletData.name
    });
  }
  contentChanged(val, event){
    this.menuTabs=val;
    let segments = event.target.parentNode.children;
    let len = segments.length;
    for(let i=0;i<len;i++){
      segments[i].classList.remove('segment-activated');
    }
    event.target.classList.add('segment-activated');
  }
  addItemToCart(i,j){
    console.log("i="+i+" j="+j);
    console.log("Added "+JSON.stringify(this.menuItems[i].menuItems[j]));
    let x=JSON.parse(JSON.stringify(this.menuItems[i].menuItems[j]));
    x["finalPrice"]=x.price;
    x["quantity"]=1;
    this.cartItems.push(x);
  }


}
