import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { CentreService } from 'src/app/service/centre.service';
import { encryptStorage, errorclass } from 'src/app/service/passwordconfirmation';

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.css']
})
export class AddResultComponent implements OnInit {

 code : string=window.history.state.code;
 page="listedon"
 myerroclass=errorclass;

 local=encryptStorage.getItem("encours")
 
  state$: Observable<object>;
  seuil1:any
  seuil2:any
  seuil3:any
  reactif1:any
  reactif2:any
  reactif3:any
  reactif4:any

  result1:any
  result2:any
  result3:any
  result4:any

  do1=0.95;
  do2=0.148;
  do3=0.165
  signin: any;



  constructor(public activatedRoute: ActivatedRoute ,private dialog: MatDialog,public centre:CentreService,public toastr:ToastrService,public route:Router) { 

    console.log(this.local)

    let compo={
      abo: new FormControl('',Validators.required),
     rhesus: new FormControl('',Validators.required),
       test1 :new FormControl('',Validators.required),
      seuill1: new FormControl('',Validators.required),
      test2: new FormControl('',Validators.required),
      seuill2: new FormControl('',Validators.required),
    test3: new FormControl('',Validators.required),
    seuill3: new FormControl('',Validators.required),

    test4: new FormControl('',Validators.required),

  }

  this.signin=new FormGroup(compo)

    console.log(this.do3.toLocaleString());

    console.log(parseFloat("0,168".replace(",",".")));
   
  }

  ngOnInit(): void {

    //this.state$ = this.activatedRoute.paramMap.pipe(map(() => window.history.state))



    //console.log( this.state$ );
  }

  openDialog(templateRef:any,width:string,height:string) {

    this.result1=this.resultat(this.reactif1,this.do1,this.seuil1)
    this.result2=this.resultat(this.reactif2,this.do2,this.seuil2)
    this.result3=this.resultat(this.reactif3,this.do3,this.seuil3)
    this.result4=this.resultat2(this.reactif4)

    console.log(this.result1)
   
    
    let dialogRef = this.dialog.open(templateRef, {
 

     autoFocus:true
   });
   }


  resultat2(reactif:string)
  {
    
    if(reactif!==undefined) 
    {
      if(reactif=="-" )
      {
   
        
       return "Negatif";
      }
      else
      {
 
        return "Positif";
      }

    } 

    else
    {
      return "rien";
    }


     


  }

  resultat(reactif:string,seuil : number,valeur :string)
  {
    
    
   if(valeur!==undefined)  
   {

    let val=parseFloat(valeur.replace(",","."))  

    

       if(reactif=="-" && (val < seuil) )
       {
        
         
        return "Negatif";
       }
       else
       {
      
         return "Positif";
       }



  }

else {
  return "rien";
}

  }

  qualite()
  {
    if(this.result1=="Positif" || this.result2=="Positif" || this.result3=="Positif"  ||this.result4=="Positif" )
    {
      return "Mauvais"
    }
    else{
      return "Bon"

    }
  }

  add_result()
  {

    let message="Chere "+this.local["prenom"]+" "+ this.local["nom"]+" les resultats de votre don de sang sont disponible  code :  "+this.local["code_don"]+" veuillez vous connecter pour les consulter "; 

    let form=this.signin.value;
    let qualite=this.qualite()
    let data={ 

      resultat:{
         "code_don":this.local["code_don"],
         "groupe_s":form["abo"],
         "rhesus":form["rhesus"],
         "test1Hiv":form["test1"],
         "test2HivSeuil":form["seuill1"],

         "test1Hbs":form["test2"],
         "test2HbsSeuil":form["seuill2"],

         "test1Hcv":form["test3"],
         "test2HcvSeuil":form["seuill3"],

         "resultatHiv":this.result1,
         "resultatHbs":this.result2,
         "resultatHcv":this.result3,

         "tpha":form["test4"],
         "resultat_tpha":this.result4,
          "qualite": qualite
        },

        user:{
          "abo":form["abo"],
          "rhesus":form["rhesus"],
          "code_donneur":this.local["code_donneur"],
          "qualite": qualite,
          "code_don":this.local["code_don"],
          "num":this.local["telephone"],
          "message":message

          


        }






      }
         



      

  this.centre.ajout_resultat(data).pipe(
    retry(0), // retry a failed request up to 3 times
    catchError(this.centre.handleError) // then handle the error
  ).subscribe((data)=>{
                console.log(data);
                if(data.valide==1)
                {
                  this.toastr.show(data.message,'',{positionClass:'toast-top-right',timeOut:5000}).onHidden.subscribe(() => {   
                    this.route.navigate(["/choix"])  
                   })
          
                }
          
         
                else
                {
                

                  this.toastr.error("une erreur c 'est produite",'',{positionClass:'toast-top-right',timeOut:2000})
           
                }
          
              
          
          
          
           
                
             
          
               
          
                //console.log(this.test(data.code));
              
                  
              




  })

    














    
  }

}
