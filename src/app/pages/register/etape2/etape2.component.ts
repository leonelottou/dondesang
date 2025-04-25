import { Component, OnInit,Output, EventEmitter, ChangeDetectorRef, OnChanges  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { APIURL } from 'src/app/enum/enum';
import { CentreService } from 'src/app/service/centre.service';
import { CommonService } from 'src/app/service/cxommonService';

import { encryptStorage, errorclass } from 'src/app/service/passwordconfirmation';

@Component({
  selector: 'app-etape2',
  templateUrl: './etape2.component.html',
  styleUrls: ['./etape2.component.css']
})
export class Etape2Component implements OnInit {

  @Output() voted = new EventEmitter<boolean>();

    data :any
    private subscription: Subscription;

  signin:FormGroup;
  myerroclass=errorclass;



  constructor(    public cd: ChangeDetectorRef,
    public commonService:CommonService,
    private user:CentreService,
    private toastr: ToastrService,) { 
      this.data=encryptStorage.getItem('don')
      let compo={
        poids: new FormControl('',Validators.required),
       taille: new FormControl('',Validators.required),
         date_last :new FormControl('',Validators.required),
        tension_a: new FormControl('',Validators.required),
        pouls: new FormControl('',Validators.required),
        taux_hemo: new FormControl('',Validators.required),
      temp: new FormControl('',Validators.required),
  
    }

    let  compo2={
      poids: new FormControl('',Validators.required),
     taille: new FormControl('',Validators.required),
  
      tension_a: new FormControl('',Validators.required),
      pouls: new FormControl('',Validators.required),
      taux_hemo: new FormControl('',Validators.required),
    temp: new FormControl('',Validators.required),

  }
      if(this.data['sexe']=="Masculin")
      {  

        console.log("dalue")
      /*   const {
          poids,
         taille, 
      
          tension_a,
          pouls,
          taux_hemo,
        temp
    
      }=compo */

      this.signin=new FormGroup(compo2)
     
       
      }

      else{
        this.signin=new FormGroup(compo)
      }

      console.log(compo)

      

     
   
    


    
      
 
    }

  ngOnInit(): void {

    this.subscription = this.commonService.notifyObservable2$.subscribe(()=> {
      this.sign()

     console.log("hello")
   

   });


    this.voted.emit(false);

    this.signin.valueChanges.subscribe( () => {
      //this.cdr.detectChanges()

      this.voted.emit(this.signin.valid);
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    this.subscription.unsubscribe()

    console.log("ésuscrobed")
    
  }

  sign()
  {

    let local=this.signin.value
    if(this.data["sexe"]!="Masculin")
    {
      local["date_last"]=local["date_last"]["year"]+"-"+local["date_last"]["month"]+"-"+local["date_last"]["day"]
    }


 console.log(local)

 encryptStorage.setItem('mondon', local)

  }


}
