import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReviewOrderPage } from './review-order';

@NgModule({
  declarations: [
    ReviewOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(ReviewOrderPage),
  ],
})
export class ReviewOrderPageModule {}
