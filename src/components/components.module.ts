import { NgModule } from '@angular/core';
import {  IonicModule } from 'ionic-angular';

import { AccordionComponent } from './accordion/accordion';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
	declarations: [
    AccordionComponent
	],
	imports: [
		IonicImageLoader,
		// CommonModule,
		IonicModule
	],
	exports: [
    AccordionComponent]
})
export class ComponentsModule {}
