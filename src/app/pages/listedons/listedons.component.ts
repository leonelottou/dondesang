import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CentreService } from 'src/app/service/centre.service';
import { Helper } from 'src/app/service/helper';
import { encryptStorage } from 'src/app/service/passwordconfirmation';

@Component({
  selector: 'app-listedons',
  templateUrl: './listedons.component.html',
  styleUrls: ['./listedons.component.css']
})
export class ListedonsComponent implements OnInit {
  searchTerm:string
search=0;
listuser:any=[]

items:any=[]
page="listedon"

donne:any=[]

 /*  donne=[
    { "nom": "ASSOM NEYENG EMMA",
    "sexe": "M",

    "ville": "Douala",
    "quartier": "bonanjo",
    "dernier_d": "24/03/2020",
    "code": "21CHUY2107-04",
    "type_d": "benevole",



    },

    { "nom": "MBAH JULES",
    "sexe": "M",

    "ville": "Douala",
    "quartier": "BONABERI",
    "dernier_d": "24/03/2020",
    "code": "21CHUY2109-013",
    "type_d": "familliale",



    },

    { "nom": "NDIFFO julie",
    "sexe": "F",

    "ville": "Yaoundé",
    "quartier": "Emana",
    "dernier_d": "23/06/2020",
    "code": "21CHUY2108-01",
    "type_d": "familliale",



    },



  ];
 */


  getItems(ev: any)
  {
      console.log("saisi");

      this.search=1;
 
      const val = this.searchTerm;

      // if the value is an empty string don't filter the items
      var res = val.toLowerCase().split(" ");
  
      console.log(res)
      let veri=false
  
  
  
  
          this.filtre(res)
  
        
  
  
     
  
      if(!val || val.trim() == '')
      {
  
        this.donne=this.listuser;
        this.search=0;
  
  
      }
  

  }

  filtre(my:any)

  {
    console.log(this.listuser)
   
    let verif=false

    this.donne = this.listuser.filter((item:any) => {
      console.log(item)

verif=false
  
  my.forEach((element:any) => {


    if((item.nom.toLowerCase().indexOf(element) > -1 || item.prenom.toLowerCase().indexOf(element) > -1 || item.ville.toLowerCase().indexOf(element) > -1 || item.code_don.toLowerCase().indexOf(element) > -1 ) && element.length > 2)
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

  constructor(public centre :CentreService,public route:Router) { 

    encryptStorage.removeItem("encours")

  

    this.centre.list_don2().subscribe((data)=>{
      this.donne=data

      console.log(data)
      this.listuser=data



  })
  }

  ngOnInit(): void {
  }

  dateformate(date)
  {
    if(date!=null && date!='')
    {
      return  Helper.dateformate2(date)
    }

    else
    {
      return ''
    }
  }

  go(item)
  {
        encryptStorage.setItem("encours",item)

        this.route.navigate(['/resultat'])

  }


}
