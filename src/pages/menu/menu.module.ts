import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuPage } from './menu';
import { IonicImageLoader } from 'ionic-image-loader';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MenuPage
    // AccordionComponent
  ],
  imports: [
    IonicPageModule.forChild(MenuPage),
    IonicImageLoader,
    ComponentsModule
  ],
})
export class MenuPageModule {}
