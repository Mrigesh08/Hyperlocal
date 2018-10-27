import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MorphlistPage } from './morphlist';
import { IonicImageLoader } from 'ionic-image-loader';
@NgModule({
  declarations: [
    MorphlistPage,
  ],
  imports: [
    IonicPageModule.forChild(MorphlistPage),
    // IonicImageLoader.forChild(MorphlistPage),
    IonicImageLoader
  ],
})
export class MorphlistPageModule {}
