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
  selector: 'app-etape1',
  templateUrl: './etape1.component.html',
  styleUrls: ['./etape1.component.css']
})
export class Etape1Component implements OnInit,  OnChanges {
  @Output() voted = new EventEmitter<boolean>();

  @Output() bon = new EventEmitter<boolean>();

    data :any
    private subscription: Subscription;
    nom:any

  signin:FormGroup;
  myerroclass=errorclass;

  date_na: any;

  val:any

 

  constructor(
    public cd: ChangeDetectorRef,
    public commonService:CommonService,
    private user:CentreService,
    private toastr: ToastrService,
    ) {

    this.data=encryptStorage.getItem('don')

    this.val=this.data
    if(this.data==null)
    {

      console.log("null")
    }

    else
    {
      console.log(this.data)
      let mydate=this.data["date_naissance"].split("-");

      this.date_na=new NgbDate(parseInt(mydate[0]),parseInt(mydate[1]),parseInt(mydate[2]));

    }

    this.signin=new FormGroup({
      nom: new FormControl(this.data?.["nom"],Validators.required),
      prenom: new FormControl(this.data?.["prenom"]),
       date_n: new FormControl('',Validators.required),
       lieu_n: new FormControl(this.data?.["lieu_naissance"],Validators.required),
       email: new FormControl(this.data?.["email"],Validators.compose([Validators.maxLength(30),  Validators.pattern(APIURL.emai_regex), Validators.required])),
    

     sexe: new FormControl(this.data?.["sexe"],Validators.required),
      ville: new FormControl(this.data?.["ville"],Validators.required),
      quartier: new FormControl(this.data?.["quartier"],Validators.required),
     sm: new FormControl(this.data?.["situation_m"],Validators.required),
    profession: new FormControl(this.data?.["profession"]),
  nb_enfant: new FormControl(this.data?.["nb_enfant"],Validators.required),

     telephone: new FormControl(this.data?.["telephone"].replace("237",''),[Validators.required,Validators.minLength(9),Validators.maxLength(9)]),
      
    })
  }


  action()
  {
    this.val==null?this.sign():this.update_pers()

  }


  ngOnInit(): void {

    this.subscription = this.commonService.notifyObservable$.subscribe(()=> {
      this.action()

      console.log("hello")
    
 
    });

    //this.vote() 

    this.voted.emit(this.signin.valid);


    this.signin.valueChanges.subscribe( () => {
      //this.cdr.detectChanges()

      this.voted.emit(this.signin.valid);
    });


  }

  vote()
  {
    this.voted.emit(true);
    console.log("aka");

  }


  

  ngOnChanges(values)
  {

    console.log("changes")
    this.voted.emit(this.signin.valid);
    this.cd.detectChanges()

  }

  tost()
  {
   // this.toastr.error("bienvenue",'',{positionClass:'toast-top-right',timeOut:4000})
  }

  update_pers(){


    console.log("salut");
    let form=this.signin.value;

  

    let id=this.data["code_donneur"]
      
        let donne={
   
          "nom":form["nom"],
          "prenom":form["prenom"],
          "date_naissance":form["date_n"]["year"]+"-"+form["date_n"]["month"]+"-"+form["date_n"]["day"],
          "email":this.signin.value["email"],
          "sexe":this.signin.value["sexe"],
          "ville":this.signin.value["ville"],
          "telephone":"237"+this.signin.value["telephone"],
          "quartier":this.signin.value["quartier"],
          "situation_m":this.signin.value["sm"],
          "profession":this.signin.value["profession"],
          "nb_enfant":this.signin.value["nb_enfant"],
          "lieu_naissance":this.signin.value["lieu_n"],
          

     
    
    
          
           } 



           this.user.update_user(donne,id).pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(this.user.handleError) // then handle the error
          ).subscribe(data => {
            console.log(data)

        

            this.data["nom"]=form["nom"];
            this.data["prenom"]=form["prenom"];
            this.data["date_n"]=form["date_n"]["year"]+"-"+form["date_n"]["month"]+"-"+form["date_n"]["day"];
            this.data["email"]=this.signin.value["email"]
            this.data["sexe"]=this.signin.value["sexe"]
            this.data["ville"]=this.signin.value["ville"]
            this.data["telephone"]="237"+this.signin.value["telephone"]
            encryptStorage.setItem('don', this.data);

                   this.bon.emit(true);


       
      

            

            
if(data.valide==0)
{
      
  this.toastr.error(data,'',{positionClass:'toast-top-right',timeOut:2000})


}
else
{
  this.toastr.show(data,'',{positionClass:'toast-top-right',timeOut:4000})
}




          })


  }

  sign(){
    console.log("salut");
    let form=this.signin.value;
  

  
      
        let donne={
   
          "nom":form["nom"],
          "prenom":form["prenom"],
          "date_naissance":form["date_n"]["year"]+"-"+form["date_n"]["month"]+"-"+form["date_n"]["day"],
          "email":this.signin.value["email"],
          "sexe":this.signin.value["sexe"],
          "ville":this.signin.value["ville"],
          "telephone":"237"+this.signin.value["telephone"],
          "quartier":this.signin.value["quartier"],
          "situation_m":this.signin.value["sm"],
          "profession":this.signin.value["profession"],
          "nb_enfant":this.signin.value["nb_enfant"],
          "lieu_naissance":this.signin.value["lieu_n"],
          

     
    
    
          
           } 



           this.user.add_user(donne).pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(this.user.handleError) // then handle the error
          ).subscribe(data => {
            console.log(data)

            encryptStorage.setItem('don', {});
            this.data=encryptStorage.getItem('don')

            this.data["nom"]=form["nom"];
            this.data["prenom"]=form["prenom"];
            this.data["date_naissance"]=form["date_n"]["year"]+"-"+form["date_n"]["month"]+"-"+form["date_n"]["day"];
            this.data["email"]=this.signin.value["email"]
            this.data["sexe"]=this.signin.value["sexe"]
            this.data["ville"]=this.signin.value["ville"]
            this.data["telephone"]="237"+this.signin.value["telephone"]
            encryptStorage.setItem('don', this.data);

      


                   console.log(data.message)
      

            

            
                              if(data.valide==0)
                              {
                                    
                                this.toastr.error(data.message,'',{positionClass:'toast-top-right',timeOut:2000})

                                this.bon.emit(false);
                              
                              
                              }
                              else
                              {
                                this.toastr.show(data.message,'',{positionClass:'toast-top-right',timeOut:4000})

                                this.data["code_donneur"]=data.code;
                                encryptStorage.setItem('don', this.data);

                                this.bon.emit(true);

                                this.send_sms(data.code,data.mp)

                                
                              }
                              



          })


  }

  send_sms(code:any,mp:any)
  {
        
    let form=this.signin.value;

    let message="Chere "+form["prenom"]+" "+ form["nom"]+" vous êtes inscrit en tant que donneur avec le code suivant :  "+code+" et le mot de passe :   "+mp+" "; 

   // let message="Chere OTTOU PAUL vous êtes inscrit en tant que donneur avec le code suivant :  "+code+" ";


          
    let donne={
      "num":"237"+this.signin.value["telephone"],
      "message":message
     
      
      
       }
 
  /*                
    let donne={
      "num":"237696026517",
      "message":message
     
      
      
       } */



         console.log(donne)
            
              this.user.sendSms(donne).pipe(
              retry(3), // retry a failed request up to 3 times
              catchError(this.user.handleError) // then handle the error
            ).subscribe(data => {
              console.log(data)
             console.log(data.message)

            

          

            }); 
              
             
           /*   */
        

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    this.subscription.unsubscribe()

    console.log("ésuscrobed")
    
  }

}
