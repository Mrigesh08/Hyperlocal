import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlankWelcomePage } from './blank-welcome';

@NgModule({
  declarations: [
    BlankWelcomePage,
  ],
  imports: [
    IonicPageModule.forChild(BlankWelcomePage),
  ],
})
export class BlankWelcomePageModule {}
