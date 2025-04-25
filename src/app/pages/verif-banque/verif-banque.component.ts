import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verif-banque',
  templateUrl: './verif-banque.component.html',
  styleUrls: ['./verif-banque.component.css']
})
export class VerifBanqueComponent implements OnInit {
  page="verifbank"
  searchTerm:string
  search=0;
  listuser:any=[]
  
  items:any=[]

  donne=[
    { "centre": "CHU yaoundé",
        "ville": "Yaoundé",
        "quartier": "Ngoa",
        "ga": "24",
        "gb": "57",
        "go": "23",
        "gab": "11",
        "qualite": "Moyenne",
        "dernier_d": "il ya 11 jours",



    },
        { "centre": "Hopital laquintie",
        "ville": "Douala",
        "quartier": "Akwa",
        "ga": "23",
        "gb": "57",
        "go": "24",
        "gab": "1",
        "qualite": "critique",
        "dernier_d": "il ya 1 jour",
    
    
    
    },

      { "centre": "Hopital general",
      "ville": "Douala",
      "quartier": "Marche",
      "ga": "9",
      "gb": "80",
      "go": "22",
      "gab": "12",
      "qualite": "bonne",
      "dernier_d": "il ya 1 mois 6 jours",
      
      
      
      },

 


  ];

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


    if((item.centre.toLowerCase().indexOf(element) > -1 || item.ville.toLowerCase().indexOf(element) > -1 ) && element.length > 2)
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


  constructor() {

    this.listuser= this.donne;
   }

  ngOnInit(): void {
  }

}
