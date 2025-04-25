
import { Injectable } from '@angular/core';
import { APIURL } from '../enum/enum';
import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse,HttpEvent, HttpEventType } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CentreService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded',

    })
  };

  constructor(public http: HttpClient) { }

  signCentre(credi:any)  {

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    //let options = new HttpHeaders({ headers: headers });



   return this.http.post<any>(APIURL.url+'centre/verif_inscription_new/', JSON.stringify(credi),this.httpOptions);

}


public handleError(error: HttpErrorResponse) {
  if (error.status === 0) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, body was: `, error.error);
  }
  // Return an observable with a user-facing error message.
  return throwError(
    'Something bad happened; please try again later.');
}

sendSms(credi:any)  {

  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  //let options = new HttpHeaders({ headers: headers });



 return this.http.post<any>(APIURL.url+'sms/sms_solliciter/', JSON.stringify(credi),this.httpOptions);

}


public upload(formData,id) {
 
      return this.http.post<any>(APIURL.url+'centre/myupload/'+id, formData, {

        reportProgress: true,

        observe: 'events',
     

      });



  }

  public uploadSignature(formData,id) {
 
    return this.http.post<any>(APIURL.url+'hopital/myupload2/'+id, formData, {

      reportProgress: true,

      observe: 'events',
   

    });



}


verifLogin(username:string,password:string){




  let credentials = {
      login: username,
      mp: password
  };
  let lien:any;

   lien='centre/verif_login'
 

//return this.http.post(APIURL.url+lien, JSON.stringify(credentials),options); 
return this.http.post<any>(APIURL.url+lien, JSON.stringify(credentials),this.httpOptions);



}




userinfo(id:any){

  

//return this.http.post(APIURL.url+'user/main_user/'+id,"",options);
return this.http.get<any>(APIURL.url+'centre/main_user/'+id,);

}
list_user(){

  

  //return this.http.post(APIURL.url+'user/main_user/'+id,"",options);
  return this.http.get<any>(APIURL.url+'user/list_user/');
  
  }

  list_don(){

  

    //return this.http.post(APIURL.url+'user/main_user/'+id,"",options);
    return this.http.get<any>(APIURL.url+'centre/list_donneur/');
    
    }

    list_don2(){

  

      //return this.http.post(APIURL.url+'user/main_user/'+id,"",options);
      return this.http.get<any>(APIURL.url+'centre/list_donneur2/');
      
      }
  


verif_update_mp(credi:any,id:any)
{
  return this.http.post<any>(APIURL.url+'user/verif_update_mp/'+id, JSON.stringify(credi),this.httpOptions);




}

ajour_don(credi:any,id:any)
{
  return this.http.post<any>(APIURL.url+'centre/ajout_don/'+id, JSON.stringify(credi),this.httpOptions);




}


ajout_resultat(credi:any)
{
  return this.http.post<any>(APIURL.url+'centre/ajout_resultat/', JSON.stringify(credi),this.httpOptions);





}

update_user(credi:any,id:any){

 



return this.http.post<any>(APIURL.url+'user/update_pers/'+id, JSON.stringify(credi),this.httpOptions);
//return this.http.post(APIURL.url2+'statique/tast/', JSON.stringify(credi),options);

}

add_user(credi:any){

 



  return this.http.post<any>(APIURL.url+'user/verif_inscription_new2/', JSON.stringify(credi),this.httpOptions);
  //return this.http.post(APIURL.url2+'statique/tast/', JSON.stringify(credi),options);
  
  }

}
