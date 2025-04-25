import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-etape3',
  templateUrl: './etape3.component.html',
  styleUrls: ['./etape3.component.css']
})
export class Etape3Component implements OnInit{

/*   @Input() s:any */

s:any

  @Output() voted = new EventEmitter<boolean>();
  question1:any=0
  question2:any=0
  question3:any=0
  question4:any=0
  question5:any=0
  question6:any=0

  constructor() {
  
   }



  ngOnInit(): void {
    this.voted.emit(false);

  }

  direct()
  {
       console.log(this.question1)
       console.log(this.question2)

       this.s=this.question1+this.question2+this.question3+this.question4+this.question5+this.question6

       console.log(this.s)

  }

   ngDoCheck(){
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.s=this.question1+this.question2+this.question3+this.question4+this.question5+this.question6

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
