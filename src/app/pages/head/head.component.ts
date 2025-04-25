import { Component, OnInit } from '@angular/core';
import { APIURL } from 'src/app/enum/enum';
import { headerTitleService } from 'src/app/service/headerService';
import { encryptStorage } from 'src/app/service/passwordconfirmation';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeaderComponent implements OnInit {
  title = '';
  image = '';

  data=encryptStorage.getItem('user')

  constructor(private headerTitleService: headerTitleService) {  console.log(this.data)}

  ngOnInit(): void {
    

    this.headerTitleService.title.subscribe(updatedTitle => {
      this.title = updatedTitle;
    });

    this.headerTitleService.image.subscribe(image => {

   
        this.image =image;

     
    });

    if(this.data!==null)
    {
       this.image=APIURL.url+'public/assets/images/centre/'+this.data['logo']   
       this.title=this.data['nom']  

      
    } 

 

  

  }



}
