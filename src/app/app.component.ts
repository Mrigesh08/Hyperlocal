import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Config, Nav, Platform } from 'ionic-angular';

// import { FirstRunPage } from '../pages';

import * as firebase from 'firebase';
import { firebaseConfig } from './environment';
import { WelcomePage } from '../pages/welcome/welcome';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { HomePage } from '../pages/home/home';
import { MorphlistPage } from '../pages/morphlist/morphlist'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TutorialPage;

  @ViewChild(Nav) nav: Nav;
  // pages: Array<{ title: string, component: any}>;

  pages: any[] = [
    { title: 'Home', component: 'HomePage' },
    { title: 'Tutorial', component: 'TutorialPage' },
    { title: 'Morph', component: 'MorphlistPage' },
  ]

  constructor(platform: Platform, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      firebase.initializeApp(firebaseConfig);      
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

}
