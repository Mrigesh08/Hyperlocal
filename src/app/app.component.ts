import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Config, Nav, Platform } from 'ionic-angular';
import * as firebase from 'firebase';
import { firebaseConfig } from './environment';
import { WelcomePage } from '../pages/welcome/welcome';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { MorphlistPage } from '../pages/morphlist/morphlist';
import { SignupPage } from '../pages/signup/signup';
import { Storage } from '@ionic/storage';
import { ImageLoaderConfig } from 'ionic-image-loader';
import { ReviewOrderPage } from '../pages/review-order/review-order';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any ;
  tutorialShownAlready : boolean = false;
  loggedInAlready : boolean = false;
  devMode : boolean = false;
  @ViewChild(Nav) nav: Nav;
  // pages: Array<{ title: string, component: any}>;

  pages: any[] = [
    { title: 'Tutorial', component: 'TutorialPage' },
    { title: 'Morph', component: 'MorphlistPage' },
  ]

  constructor(platform: Platform, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen, private storage : Storage, private imageLoaderConfig : ImageLoaderConfig) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      // splashScreen.hide();
      firebase.initializeApp(firebaseConfig);
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.imageLoaderConfig.enableDebugMode();
      if(this.devMode){
        this.rootPage = MorphlistPage;
      }
      else{
        storage.get("user").then((val)=>{
          if(val){
            this.rootPage = MorphlistPage;
          }
          else{
            this.rootPage = WelcomePage;
          }
        });
      }
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

}
