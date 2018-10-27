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
import { SignupPageModule } from '../pages/signup/signup.module';
import { WelcomePageModule } from '../pages/welcome/welcome.module';
import { MorphlistPageModule } from '../pages/morphlist/morphlist.module';
import { UserProvider } from '../providers/user/user';
import { OrganizationProvider } from '../providers/organization/organization';
import { TutorialPageModule } from "../pages/tutorial/tutorial.module";
import { MenuPageModule } from '../pages/menu/menu.module';
import { ReviewOrderPageModule } from "../pages/review-order/review-order.module";
import {AccordionComponent} from '../components/accordion/accordion';
import { IonicImageLoader } from 'ionic-image-loader';
import { LoginPageModule } from '../pages/login/login.module';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicImageLoader.forRoot(),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    SignupPageModule,
    WelcomePageModule,
    TutorialPageModule,
    MorphlistPageModule,
    MenuPageModule,
    ReviewOrderPageModule,
    LoginPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
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
