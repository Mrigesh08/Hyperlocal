import { Component, ViewChild, OnInit, Renderer, Input } from '@angular/core';

/**
 * Generated class for the AccordionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'accordion',
  templateUrl: 'accordion.html'
})
export class AccordionComponent implements OnInit{
  cardExpanded : boolean = false;
  @ViewChild("cc") customizationContent : any;
  @Input() image : string;
  @Input() price : string;
  @Input() name : string;
  @Input() description : string;


  constructor(public renderer: Renderer) {

  }
  ngOnInit(){
    this.renderer.setElementStyle(this.customizationContent.nativeElement,"webkitTransition","max-height 500ms");
  }
  toggleCard(){
    if(this.cardExpanded){
      this.renderer.setElementStyle(this.customizationContent.nativeElement,"max-height","0px");
    }
    else{
      this.renderer.setElementStyle(this.customizationContent.nativeElement,"max-height","700px");

    }
    this.cardExpanded =  ! this.cardExpanded;

  }
}
