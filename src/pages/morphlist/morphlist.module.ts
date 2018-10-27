import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MorphlistPage } from './morphlist';

@NgModule({
  declarations: [
    MorphlistPage,
  ],
  imports: [
    IonicPageModule.forChild(MorphlistPage),
  ],
})
export class MorphlistPageModule {}
