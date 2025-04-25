import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { APIURL } from 'src/app/enum/enum';
import { CommonService } from 'src/app/service/cxommonService';
import { encryptStorage } from 'src/app/service/passwordconfirmation';
import { Etape1Component } from '../etape1/etape1.component';

@Component({
  selector: 'app-add-donneur',
  templateUrl: './add-donneur.component.html',
  styleUrls: ['./add-donneur.component.css']
})
export class AddDonneurComponent implements OnInit {
  index=1;
  page="register"
  s=0;

 

  valid=false

  


  constructor( private dialog: MatDialog ,private route: ActivatedRoute,public commonService:CommonService) {

 
    
    
     
    
     
     
    
    
    
    
    


  }

  ngOnInit(): void {
  }

  onVoted(val:boolean ) {
    if(this.index==1)
    {
      this.valid=val;
    }

  }

  onVoted2(val:boolean ) {
    if(this.index==2)
    {
      this.valid=val;
    }

    }

    onVoted3(val:boolean ) {
      if(this.index==3)
      {
        this.valid=val;
      }
  
      }

      
    onVoted4(val:boolean ) {
      if(this.index==4)
      {
        this.valid=val;
      }
  
      }

  next()
  {

    if(this.index==2)
    {
      console.log("allez")
      this.commonService.setpage2();
    }
    
    this.index==1?this.save():this.index++;
  }

 prev()
  {
    this.index--;
  }

  is_good(val:boolean )
  {

     if(val)
     {
       this.index++
     }

  }

  save()
  {
    
    
 

    this.commonService.setpage1();


  }

  openDialog(templateRef:any) {
    
    let dialogRef = this.dialog.open(templateRef, {
     width: '300px',
  
     autoFocus:true
   });

}

}
