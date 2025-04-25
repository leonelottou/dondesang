import { Component, OnInit } from '@angular/core';
import { NavigatorComponent } from '../navigator/navigator.component';
import { MatDialog } from '@angular/material/dialog';

import { encryptStorage, local } from 'src/app/service/passwordconfirmation';
import {CentreService } from 'src/app/service/centre.service';
import { catchError, retry } from 'rxjs/operators';
import { headerTitleService } from 'src/app/service/headerService';
import { APIURL } from 'src/app/enum/enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  page="home"
  sess:any;
  local=encryptStorage.getItem('user')

  constructor(private dialog: MatDialog,private user:CentreService,private headerTitleService: headerTitleService) {
    this.sess=this.local["sess"];

    console.log(this.local["id"])
    if(this.local["id"]==null)
    {
               this.networkload();
             

    }
     else
    {
        this.headerTitleService.setTitle(this.local['nom']);
        this.headerTitleService.setImage(APIURL.url+'public/assets/images/centre/'+this.local['logo']);

        console.log(this.local['logo'])
         //this.affichedon();
    } 
    


   }


   networkload()
{
  
  this.user.userinfo(this.sess).pipe(
    retry(3), // retry a failed request up to 3 times
    catchError(this.user.handleError) // then handle the error
  ).subscribe(data => {
    console.log(data)
    this.local["nom"]=data.nom
    this.local["adresse"]=data.adresse
    this.local["email"]=data.email
    this.local["telephone"]=data.telephone
    this.local["ville"]=data.ville
    this.local["login"]=data.login
    this.local["logo"]=data.logo
    this.local["id"]=data.id
    this.local["quartier"]=data.quartier
    this.local["code"]=data.code
    this.local["region"]=data.region

    encryptStorage.setItem('user', this.local);

  console.log(encryptStorage.getItem('user'))


  //this.headerTitleService.setTitle(this.local["prenom"]+" "+this.local['nom']);

  this.headerTitleService.setTitle(this.local['nom']);
  this.headerTitleService.setImage(APIURL.url+'public/assets/images/centre/'+this.local['logo']);

  console.log("text")


//this.affichedon();






  })
}


  ngOnInit(): void {
  }

}
