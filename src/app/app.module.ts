import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HTTP } from '@ionic-native/http';
import { Toast } from '@ionic-native/toast';
import { IonicStorageModule, Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { SignupPage } from '../pages/signup/signup';
import { WelcomePage } from '../pages/welcome/welcome';
import { MorphlistPage } from '../pages/morphlist/morphlist';
import { UserProvider } from '../providers/user/user';
import { OrganizationProvider } from '../providers/organization/organization';
import { TutorialPage } from "../pages/tutorial/tutorial";
import { MenuPage } from '../pages/menu/menu';
import { ReviewOrderPage } from "../pages/review-order/review-order";
import {AccordionComponent} from '../components/accordion/accordion';
import { IonicImageLoader } from 'ionic-image-loader';
import { LoginPage } from '../pages/login/login';

@NgModule({
  declarations: [
    MyApp,
    SignupPage,
    WelcomePage,
    TutorialPage,
    MorphlistPage,
    MenuPage,
    ReviewOrderPage,
    AccordionComponent,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicImageLoader.forRoot(),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignupPage,
    WelcomePage,
    TutorialPage,
    MorphlistPage,
    MenuPage,
    ReviewOrderPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    HTTP,
    Toast,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    OrganizationProvider,
  ]
})
export class AppModule {}
