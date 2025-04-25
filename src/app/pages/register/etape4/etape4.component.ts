import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-etape4',
  templateUrl: './etape4.component.html',
  styleUrls: ['./etape4.component.css']
})
export class Etape4Component implements OnInit {
  s:any

  @Output() voted = new EventEmitter<boolean>();
  question1:any=0
  question2:any=0
  question3:any=0
  
  question4:any=0
  question5:any=0
  question6:any=0
  question7:any=0

  constructor() { }

  ngOnInit(): void {
    this.voted.emit(false);
  }

  ngDoCheck(){
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.s=this.question1+this.question2+this.question3+this.question4+this.question5+this.question6+this.question7

    console.log("s est"+this.s)

    if(this.s==0)
    {
      this.voted.emit(true);
    }

    if(this.s!=0)
    {
      this.voted.emit(false);
    }
    
  }

}
