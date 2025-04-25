import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { catchError, retry } from 'rxjs/operators';
import { APIURL } from 'src/app/enum/enum';
import { CentreService } from 'src/app/service/centre.service';
import { Helper } from 'src/app/service/helper';
import { encryptStorage } from 'src/app/service/passwordconfirmation';

@Component({
  selector: 'app-etape5',
  templateUrl: './etape5.component.html',
  styleUrls: ['./etape5.component.css']
})
export class Etape5Component implements OnInit {
  quantite:any
  code_prelevement:string
  date_prelevement:any
  date_prochain:any
  local=encryptStorage.getItem('don')
  data=encryptStorage.getItem('user')
  mondon=encryptStorage.getItem('mondon')

  constructor( private dialog: MatDialog,public http: HttpClient,public centre:CentreService,public toastr:ToastrService,public route:Router) {

  console.log(this.local)
  console.log(this.data)
  console.log(this.mondon)
   }

  ngOnInit(): void {
  }

        openDialog(templateRef:any,width:string,height:string) {
          this.generatecode()
          
          let dialogRef = this.dialog.open(templateRef, {
       
      
           autoFocus:true
         });
         }
 

           dateformate(date)
           {
             if(date!=null && date!='')
             {
               return  Helper.dateformate(date)
             }

             else
             {
               return ''
             }
           }


          generatecode()
          {
            return this.http.get<any>(APIURL.url+'centre/code_don/'+this.data['code'],).subscribe((data)=>{

              console.log(Helper.dateformate(data["date"]))

              this.date_prelevement=data["date"];
              this.date_prochain=data["prochain"]
              this.code_prelevement=data['code']
              
              


            });
           
          }

          save_don()
          {
                let data={ "code_don":this.code_prelevement,
                            "code_donneur":this.local["code_donneur"],
                            "id_centre":this.data["id"],
                            "date_don":this.date_prelevement,
                            "date_regle":this.mondon?.['date_last'],
                            "poids":this.mondon['poids'],
                            "taille":this.mondon['taille'],
                            "pouls":this.mondon['pouls'],
                            "ta":this.mondon['tension_a'],
                            "taux_hemo":this.mondon['taux_hemo'],
                            "temperature":this.mondon['temp'],
                            "quantite_sang":this.quantite
                          }

                          this.centre.ajour_don(data,this.local["code_donneur"]).pipe(
                            retry(0), // retry a failed request up to 3 times
                            catchError(this.centre.handleError) // then handle the error
                          ).subscribe((data)=>{
                                        console.log(data);
                                        if(data.valide==1)
                                        {
                                          this.toastr.show(data.message,'',{positionClass:'toast-top-right',timeOut:1000}).onHidden.subscribe(() => {    this.route.navigate(["/choix"])  
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
