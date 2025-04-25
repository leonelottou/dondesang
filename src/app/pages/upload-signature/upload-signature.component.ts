import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignaturePad } from 'angular2-signaturepad';
import { ToastrService } from 'ngx-toastr';
import { CentreService } from 'src/app/service/centre.service';

@Component({
  selector: 'app-upload-signature',
  templateUrl: './upload-signature.component.html',
  styleUrls: ['./upload-signature.component.css']
})
export class UploadSignatureComponent implements OnInit {

  @ViewChild(SignaturePad) signaturePad: SignaturePad;

public signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 500,
    'canvasHeight': 300
  };

  filed:any
  loading: boolean=false;
  uploadProgress:any;
  uploadSub: any;
  id: string | null;


  constructor(private route: ActivatedRoute,private uploadService: CentreService,  private toastr: ToastrService,
    private routes:Router) {
      this.id=this.route.snapshot.paramMap.get('id')
     }

  ngOnInit(): void {
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());

    

     var blobBin = atob(this.signaturePad.toDataURL().split(',')[1]);
var array :number[] = [];
for(var i = 0; i < blobBin.length; i++) {
    array.push(blobBin.charCodeAt(i));
}

this.filed=new Blob([new Uint8Array(array)], {type: 'image/png'});
 
   
    

    
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }
  drawclear()
  {

    this.signaturePad.clear();

  }

  
  uploadFiles()
  {

    if (this.filed) {
      const formData = new FormData();  

      formData.append('file', this.filed);  
   

      this.uploadSub = this.uploadService.uploadSignature(formData,this.id).subscribe((event: HttpEvent<any> ) =>{

        console.log(event)
        if(event.type==HttpEventType.Response)
        {
            console.log(event.body)

            this.toastr.show(event.body.message,'',{positionClass:'toast-top-center',timeOut:4000}).onHidden.subscribe(() => {
     

              // this.send_sms(data.code)
 
               this.routes.navigate(["/login"])
           
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


}
