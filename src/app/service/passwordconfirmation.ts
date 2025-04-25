import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

export class PasswordValidator {
// Inspired on: http://plnkr.co/edit/Zcbg2T3tOxYmhxs7vaAm?p=preview
static areEqual(formGroup: FormGroup) {
	let val;
	let valid = true;

	for (let key in formGroup.controls) {
		if (formGroup.controls.hasOwnProperty(key)) {
			let control: FormControl = <FormControl>formGroup.controls[key];
			if (val === undefined) {
				val = control.value
			} else {
				if (val !== control.value) {
					valid = false;
					break;
				}
			}
		}
	}
	if (valid) {
		return null;
	}
	return {
		areEqual: true
	}
 }

 static    MatchPassword(mp:string,confirm:string): ValidatorFn { 
     
   return (AC: AbstractControl) : ValidationErrors | null => {
    const password = AC.get(mp)?.value; // to get value in input tag
    const confirmPassword = AC.get(confirm)?.value; // to get value in input tag
    if (password !== confirmPassword) {
      return {MatchPassword: true};
    } else {
        return null
    }
};

 }


 static isValid(control: FormControl): any {



        if(control.value !=localStorage.getItem('mp')){
            return {
                "Mauvais mot de passe ": true
            };
        }


        return null;
    }







}

export function controlerouting(route:any)
	{
		if(localStorage.getItem("@prefix:user")==null )
        {
			  console.log("c est nullle")
			
			  console.log(localStorage.getItem("@prefix:user"))
			  route.navigate(["/login"])
			}
	}

	export function errorclass(form:any,nom:any,type=1,form2="")
	{
	          if(type==1)
			  {
				if (form.get(nom)?.valid) {
					return 'is-valid';
				  }
	
				  else if (form.get(nom)?.invalid && ( form.get(nom)?.dirty || form.get(nom)?.touched) ){
					return 'is-invalid';
				  }
				  else{
					  return ''
				  }
			  }
			  else if(type==2){
				if (form.get(form2)?.get(nom)?.valid) {
					return 'is-valid';
				  }
	
				  else if (form.get(form2)?.get(nom)?.invalid && ( form.get(form2)?.get(nom)?.dirty || form.get(form2)?.get(nom)?.touched) ){
					return 'is-invalid';
				  }
				  else{
					  return ''
				  }


			  }

			  else {
				let classe="";
            

				if (form.get(form2)?.get(nom)?.valid  ) {
				
					classe='is-valid'
				  }
				 // form.get(form2)?.get(nom)?.invalid || 
				   if ((form.get(form2)?.get(nom)?.invalid || form.get(form2)?.invalid) && ( form.get(form2)?.get(nom)?.dirty || form.get(form2)?.get(nom)?.touched)  ){
					classe='is-invalid'
			
				
				  }

				  return classe
				


			  }
		
	}


import { EncryptStorage } from 'encrypt-storage';

export const encryptStorage = EncryptStorage('jaimelinfo02@111', {prefix: '@prefix'})

export class local {

	static get(tab:any,item:string)
	{
		var trouv = tab.find(function(post:any, index:any) {
			if(post.nom == item)
				{return post.valeur; }

				else{ return 0;}
		});

		return trouv.valeur;
	}

}






