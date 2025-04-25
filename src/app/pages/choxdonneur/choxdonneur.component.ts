import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, retry } from 'rxjs/operators';
import { CentreService } from 'src/app/service/centre.service';
import { encryptStorage } from 'src/app/service/passwordconfirmation';

interface user {
 nom:string;
 sexe: string;
 ville: string;
 code: string;
}

@Component({
  selector: 'app-choxdonneur',
  templateUrl: './choxdonneur.component.html',
  styleUrls: ['./choxdonneur.component.css']

  
})



export class ChoxdonneurComponent implements OnInit {
 
  page="register"

  donne:any=[];
searchTerm:string
search=0;

items:any=[]

  listuser:any=[
    { "nom": "ASSOM NEYENG EMMA",
    "sexe": "M",

    "ville": "Douala",

    "code": "21CHUY2107-04",




    },

    { "nom": "MBAH JULES",
    "sexe": "M",

    "ville": "Douala",
 
    "code": "21CHUY2109-013",




    },

    { "nom": "NDIFFO julie",
    "sexe": "F",

    "ville": "Yaoundé",


    "code": "21CHUY2108-01",




    },



  ];

  constructor(private user:CentreService,public route:Router) { 

    encryptStorage.removeItem('don');
    encryptStorage.removeItem('mondon');

    this.load()
  }

  register(item)
  {

    encryptStorage.setItem('don', item);

    this.route.navigate(["/registerdonnor"])
  }

  getItems(ev: any)
  {
  

      this.search=1;
      this.donne=this.listuser;
      const val = this.searchTerm;

      // if the value is an empty string don't filter the items
      var res = val.toLowerCase().split(" ");
  
     // console.log(res)
      let veri=false
  
  
  
  
          this.filtre(res)
  
        
  
  
     
  
      if(!val || val.trim() == '')
      {
  
        this.donne=[];
        this.search=0;
  
  
      }
  

  }

  filtre(my:any)

  {
   // console.log(this.donne)
   
    let verif=false

    this.donne = this.donne.filter((item:any) => {
   

verif=false
  
  my.forEach((element:any) => {


    if((item.nom.toLowerCase().indexOf(element)  > -1 || item.prenom.toLowerCase().indexOf(element)  > -1 )  && element.length > 2)
    {
        //  console.log(item.Name+"  "+element)
       verif=true
    }
    
  });
      
  

  // console.log(verif)
        
  //  console.log(tab.indexOf(element))

          return (verif);
          
     
        
    
       
      }) 

  }


  ngOnInit(): void {


  }

  load()
  {
        this.user.list_user().pipe(
    retry(3), // retry a failed request up to 3 times
    catchError(this.user.handleError) // then handle the error
  ).subscribe(data => {
    console.log(data)

    this.listuser=data

  })



  }

}
