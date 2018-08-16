import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Config, Nav, Platform } from 'ionic-angular';
import * as firebase from 'firebase';
import { firebaseConfig } from './environment';
import { WelcomePage } from '../pages/welcome/welcome';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { MorphlistPage } from '../pages/morphlist/morphlist'
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any ;
  tutorialShownAlready : boolean = false;
  loggedInAlready : boolean = false;
  @ViewChild(Nav) nav: Nav;
  // pages: Array<{ title: string, component: any}>;

  pages: any[] = [
    { title: 'Tutorial', component: 'TutorialPage' },
    { title: 'Morph', component: 'MorphlistPage' },
  ]

  constructor(platform: Platform, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen, private storage : Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      // splashScreen.hide();
      firebase.initializeApp(firebaseConfig);
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.storage.get("tutorialShownAlready").then((val)=>{
        if(val){
          this.tutorialShownAlready = val;
        }
        else{
          this.storage.set("tutorialShownAlready",true);
        }
      });
      this.storage.get("loggedInAlready").then((val)=>{
        if(val){
          this.loggedInAlready = val;
        }
        // remember to set this value to true on successful login
      });
      if(!this.tutorialShownAlready){
        this.rootPage = TutorialPage;
      }
      else if(!this.loggedInAlready){
        this.rootPage = WelcomePage;
      }
      else{
        this.rootPage = MorphlistPage;
      }
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

}
