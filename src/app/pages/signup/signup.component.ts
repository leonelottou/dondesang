import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ToastrService } from 'ngx-toastr';
import { catchError, retry } from 'rxjs/operators';
import { APIURL } from 'src/app/enum/enum';
import { CentreService } from 'src/app/service/centre.service';
import { errorclass, PasswordValidator } from 'src/app/service/passwordconfirmation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide = true;
  loading:number=0
  ville:any
  myerroclass=errorclass;

  quartier:any
  adresse:any
  region:string
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;

  @ViewChild("placesRef2") placesRef2 : GooglePlaceDirective;
  options : any={
    types: ['(cities)'],
    componentRestrictions: { country: 'CM' }
    }

    options2 : any={
    
      componentRestrictions: { country: 'CM' }
      }
    
  public handleAddressChange(address: Address) {

  console.log(address.address_components[2])

  let reg=address.address_components[2];

  this.ville=address.name

  this.region=reg.long_name

   if(reg.long_name.indexOf('Région de l\'') !=-1)
  {
    console.log(this.region.replace('Région de l\'',''))

    this.region=this.region.replace('Région de l\'','')
  } 
 /*  if(reg.long_name.indexOf('Région de') !=-1)
  {
    console.log(this.region.replace('Région de',''))
  }
 */
  if(reg.long_name.indexOf('Région du') !=-1)
  {
    console.log(this.region.replace('Région du',''))

    this.region=this.region.replace('Région du',"")
  }





  

  // Do some stuff
}

public handleAddressChange2(address: Address) {
  console.log(address.address_components)

  let reg=address.address_components[0];

  this.quartier=address.name

}



signin1=new FormGroup({
  nom: new FormControl('',Validators.required),

  code: new FormControl('',Validators.required),




 email: new FormControl('',[ Validators.pattern(APIURL.emai_regex), Validators.required]),
  quartier: new FormControl('',Validators.required),

  ville: new FormControl('',Validators.required),
  telephone: new FormControl('',[Validators.required,Validators.minLength(9),Validators.maxLength(9)]),


 

  })

  signin2=new FormGroup({

          login: new FormControl('',Validators.required),
         
        verif_mp : new FormGroup({
          mp: new FormControl('',[Validators.required,Validators.pattern(APIURL.mp_reqex),Validators.minLength(6)]),
          confirm_mp:  new FormControl('',Validators.required),
           }, 
         PasswordValidator.MatchPassword("mp",'confirm_mp')
           )

    })
   


  constructor(private user:CentreService,
    private toastr: ToastrService,
    private route:Router) { }

  ngOnInit(): void {
  }

  val(nom:string)
  {
   return this.signin1.get(nom)?.invalid && ( this.signin1.get(nom)?.dirty || this.signin1.get(nom)?.touched)

  }

  val3(nom:string)
  {
   return this.signin2.get(nom)?.invalid && ( this.signin2.get(nom)?.dirty || this.signin2.get(nom)?.touched)

  }


  
  val2(nom:string)
  {
   return this.signin1?.get('verif_mp')?.get(nom)?.invalid && (this.signin1?.get('verif_mp')?.get(nom)?.dirty || this.signin1?.get('verif_mp')?.get(nom)?.touched)

  }

  
sign()
{
      
  console.log("salut");
  let form=this.signin1.value;
  let form2=this.signin2.value;
  this.loading=1;
  
  let donne={
      "nom":form["nom"],
      "adresse":form["prenom"],
      "code":form["code"],
      "ville":form["ville"],
      "region":this.region,
      "quartier":form["quartier"],
      "email":form["email"],
      "telephone":"237"+this.signin1.value["telephone"],
      "mp":form2['verif_mp']['mp'],
      "login":form2['login'],



      
       } 
 
        
      /* let donne={
        "nom":"CHU YAOUNDE",
        "adresse":'Biyem assi',
        "code":"CHUY",
        "ville":'Yaoundé',
        "region":"Littoral",
        "quartier":"Biyem-assi",
        "email":"leonelottou@yahoo.fr",
        "telephone":"237653186861",
        "mp":"ribery02",
        "login":"leonelo",
  

         }  */
  

       console.log(donne)
          
       
            this.user.signCentre(donne).pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(this.user.handleError) // then handle the error
          ).subscribe(data => {
            console.log(data)

            

            console.log (data.message);
            this.loading=0;

            if(data.valide==0)
            {
                  
              this.toastr.error(data.message,'',{positionClass:'toast-top-center',timeOut:2000})


            }
            else
            {
              this.toastr.show(data.message,'',{positionClass:'toast-top-center',timeOut:4000}).onHidden.subscribe(() => {
       

             // this.send_sms(data.code)

              this.route.navigate(["/uploadLogo",{id:data.id}])
          
              })
            }

          }); 
            
           
         /*   */
      





}




}

