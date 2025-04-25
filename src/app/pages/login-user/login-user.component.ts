import { Component, OnInit } from '@angular/core';
import { encryptStorage } from 'src/app/service/passwordconfirmation';
import { CentreService } from 'src/app/service/centre.service';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { headerTitleService } from 'src/app/service/headerService';
import { APIURL } from 'src/app/enum/enum';


@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  hide = true;
  log:any
  mp:any
  loading:number=0

  constructor(private user:CentreService,
    private toastr: ToastrService,
    private route:Router,
    private headerTitleService: headerTitleService,
    public http2:HttpClient,

  ) { 
    this.hide = true;
    encryptStorage.clear();

    this.http2.get<any>("
                        https://xxxxxxxx.github.io/url.json"
    
                       
                       ).subscribe((res) => {
      console.log(res);
      
  
     // localStorage.setItem("serveur",res.lien)
  
      APIURL.url=res.lien4
      APIURL.url2=res.lien2
      APIURL.url3=res.lien3
  
      console.log(APIURL.url)

      encryptStorage.setItem("xddf",res.lien4)
                                         
  
  })


  }

  async login() 
  {
    this.loading=1
    this.user.verifLogin(this.log,this.mp).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.user.handleError) // then handle the error
    ).subscribe(data => {
      console.log(data)

      

      console.log (data.message);
      this.loading=0;

      if(data.valide==0)
      {
            
        this.toastr.error(data.message,'',{positionClass:'toast-top-right',timeOut:2000})


      }
      else
      {
        this.toastr.show(data.message,'',{positionClass:'toast-top-right',timeOut:4000}).onHidden.subscribe(() => {
 


          encryptStorage.setItem('user', {"sess":data.id});



 
      
   

       this.route.navigate(["/home"])

      //console.log(this.test(data.code));
    
        })
      }

    }); 

  }


  ngOnInit(): void {
    this.headerTitleService.setTitle("");
    this.headerTitleService.setImage("");
    
  }

}
