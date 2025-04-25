import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of, Subscription } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { CentreService } from 'src/app/service/centre.service';

@Component({
  selector: 'app-upload-logo',
  templateUrl: './upload-logo.component.html',
  styleUrls: ['./upload-logo.component.css']
})
export class UploadLogoComponent implements OnInit {

  id:any
  filed:any
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files = [];

  public imagePath:any;
  imgURL: any="assets/images/image.png";
  message: string;
  loading: boolean=false;
  uploadProgress:any;
  uploadSub: any;

  constructor(private route: ActivatedRoute,private uploadService: CentreService,  private toastr: ToastrService,
    private routes:Router) { 
              this.id=this.route.snapshot.paramMap.get('id')

             


  }

  ngOnInit(): void {
  }


  preview(files:any) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
     if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
     else{
       this.message = "";
 
     }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
      console.log(     this.imgURL);
    }
  }

  
selectFile(event,files:any) {

 this.filed = event.target.files[0];

 console.log(this.filed)
 this.uploadProgress=0

  this.preview(files)

  
     
    }

    uploadFiles()
    {

      if (this.filed) {
        const formData = new FormData();  

       //console.log(formData);
  
        formData.append('file', this.filed);  
     

        this.uploadSub = this.uploadService.upload(formData,this.id).subscribe((event: HttpEvent<any> ) =>{

          console.log(event)
          if(event.type==HttpEventType.Response)
          {
              console.log(event.body)

              this.toastr.show(event.body.message,'',{positionClass:'toast-top-center',timeOut:4000}).onHidden.subscribe(() => {
       

                // this.send_sms(data.code)
   
                 this.routes.navigate(["/uploadSignature",{id:this.id}])
             
                 })

          }

        if (event.type == HttpEventType.UploadProgress) {

     
       
            console.log(event.total)
            if(event.total)
            {
              this.uploadProgress=Math.round(event.loaded / event?.total * 100);

              console.log( this.uploadProgress)
              this.filed=null
            }
        
          //this.uploadProgress = Math.round(100 * (event.loaded / event.total));

       
       
        }

         // console.log(data)

                  this.loading=false

        })
  
   
  // @ts-ignore: Object is possibly 'null'.
    }


    }

    

    cancelUpload() {
      this.uploadSub.unsubscribe();
      this.reset();
    }
  
    reset() {
      this.uploadProgress = null;
      this.uploadSub = null;
    }

}
