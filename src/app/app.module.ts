import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { IonicStorageModule, Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { SignupPage } from '../pages/signup/signup';
import { WelcomePage } from '../pages/welcome/welcome';
import { MorphlistPage } from '../pages/morphlist/morphlist';
import { UserProvider } from '../providers/user/user';
import { OrganizationProvider } from '../providers/organization/organization';
import { TutorialPage } from "../pages/tutorial/tutorial";

@NgModule({
  declarations: [
    MyApp,
    SignupPage,
    WelcomePage,
    TutorialPage,
    MorphlistPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignupPage,
    WelcomePage,
    TutorialPage,
    MorphlistPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    OrganizationProvider,
  ]
})
export class AppModule {}
