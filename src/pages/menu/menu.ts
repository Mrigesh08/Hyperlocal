import { Component, ViewChild, Renderer, OnInit, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
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
export class MenuPage implements OnInit{
  items : any = [];
  title : any;
  slides : any = [];
  outletData: any;
  reviewOrderPage : any = ReviewOrderPage;
  menuTabs : any;
  themeColor : any;
  @ViewChild( "cartButton", {read : ElementRef}) cartButton: ElementRef;
  @ViewChild( "myMenuTab" , {read : ElementRef} ) menuTabsTheme : ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer : Renderer) {
    this.title = "Menu";
    this.outletData = navParams.get('data');
    this.menuTabs = "menu1";
    this.themeColor = this.outletData.themeColor;
    console.log(this.outletData.name);
    let x={
      icon : this.outletData.image,
      menuImage : this.outletData.menuImage,
      price : "Rs. 250",
      name  : "Name1",
      description : "1. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
    }
    let y={
      title: "Welcome to the Docs!",
      image: this.outletData.menuImage,
    }
    for(let i=0;i<5;i++){
      this.items.push(x);
      this.slides.push(y);
    }
  }

  ngOnInit(){
    this.renderer.setElementStyle(this.cartButton.nativeElement, "background-color" , this.themeColor);
    // console.log(      this.menuTabsTheme.nativeElement.children[0].style.borderBottomColor);
    for(let i=0;i<this.menuTabsTheme.nativeElement.children.length ;i++){
      this.menuTabsTheme.nativeElement.children[i].style.color = this.themeColor;
      this.menuTabsTheme.nativeElement.children[i].style.borderBottomColor = this.themeColor;


    }
  }
  reviewOrder(){
    this.navCtrl.push(this.reviewOrderPage);
  }



}
