import { Component, OnInit } from '@angular/core';
import { CentreService } from 'src/app/service/centre.service';
import { Helper } from 'src/app/service/helper';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  page="search"
  searchTerm:string
  search=0;
  listuser:any=[]

  
  items:any=[]
  donne:any=[]

/*   donne=[
    { "nom": "ASSOM NEYENG EMMA",
    "sexe": "M",
    "ABO": "AB+",
    "ville": "Douala",
    "quartier": "bonanjo",
    "dernier_d": "24/03/2020",
    "lieu_d": "Douala",
    "type_d": "benevole",
    "qualite": "bon",


    },

    { "nom": "MBAH JULES",
    "sexe": "M",
    "ABO": "AB+",
    "ville": "Douala",
    "quartier": "BONABERI",
    "dernier_d": "24/03/2020",
    "lieu_d": "Douala",
    "type_d": "familliale",
    "qualite": "mauvais",


    },

    {"nom": "NDIFFO julie",
    "sexe": "F",
    "ABO": "0+",
    "ville": "Yaoundé",
    "quartier": "Emana",
    "dernier_d": "23/06/2020",
    "lieu_d": "Yaoundé",
    "type_d": "familliale",
    "qualite": "en cours",


    },



  ];
 */

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
    console.log(this.donne)
   
    let verif=false

    this.donne = this.listuser.filter((item:any) => {
      console.log(item)

verif=false
  
  my.forEach((element:any) => {


    if((item.nom.toLowerCase().indexOf(element) > -1 || item.prenom.toLowerCase().indexOf(element) > -1|| item.ville.toLowerCase().indexOf(element) > -1 ) && element.length > 2)
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

  constructor(public centre :CentreService) {
   // this.listuser= this.donne;

    this.centre.list_don().subscribe((data)=>{
      this.donne=data

      console.log(data)
      this.listuser=data


  })

   }

  ngOnInit(): void {

 
    
  }



}
