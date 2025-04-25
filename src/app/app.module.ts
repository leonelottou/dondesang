import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {MaterialModule} from './material/material.module';
import { HeaderComponent } from './pages/head/head.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuChoixComponent } from './pages/menu-choix/menu-choix.component';
import { LoginUserComponent } from './pages/login-user/login-user.component'
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './pages/footer/footer.component';
import { NavigatorComponent } from './pages/navigator/navigator.component';
import { AddDonneurComponent } from './pages/register/add-donneur/add-donneur.component';
import { SearchComponent } from './pages/search/search.component';
import { VerifBanqueComponent } from './pages/verif-banque/verif-banque.component';
import { Etape1Component } from './pages/register/etape1/etape1.component';
import { Etape2Component } from './pages/register/etape2/etape2.component';
import { Etape3Component } from './pages/register/etape3/etape3.component';
import { Etape4Component } from './pages/register/etape4/etape4.component';
import { Etape5Component } from './pages/register/etape5/etape5.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ListedonsComponent } from './pages/listedons/listedons.component';
import { AddResultComponent } from './pages/add-result/add-result.component'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ChoxdonneurComponent } from './pages/choxdonneur/choxdonneur.component';
import { SignupComponent } from './pages/signup/signup.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { headerTitleService } from 'src/app/service/headerService';
import { CommonService } from 'src/app/service/cxommonService';
import { HttpClientModule } from '@angular/common/http';

import { CentreService } from './service/centre.service';
import { FormErrorComponent } from './form-error/form-error.component';
import { ToastrModule } from 'ngx-toastr';
import { UploadLogoComponent } from './pages/upload-logo/upload-logo.component';
import { UploadSignatureComponent } from './pages/upload-signature/upload-signature.component';
import { SignaturePadModule } from 'angular2-signaturepad';

const routes: Routes = [

  { path: 'welcome', component: MenuChoixComponent},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginUserComponent},
  { path: 'registerdonnor', component: AddDonneurComponent},

  { path: 'search', component: SearchComponent},
  { path: 'verifbank', component: VerifBanqueComponent},

  { path: 'listedons', component: ListedonsComponent},
  { path: 'resultat', component: AddResultComponent},
  { path: 'choix', component: ChoxdonneurComponent},

  { path: 'signup', component: SignupComponent},

  { path: 'uploadLogo', component: UploadLogoComponent},
  { path: 'uploadSignature', component: UploadSignatureComponent},



    {path: '', redirectTo: 'login', pathMatch: 'full' }
];

const maskConfig: Partial<IConfig> = {
  validation: false,
};


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    MenuChoixComponent,
    LoginUserComponent,
    FooterComponent,
    NavigatorComponent,
    AddDonneurComponent,
    SearchComponent,
    VerifBanqueComponent,
    Etape1Component,
    Etape2Component,
    Etape3Component,
    Etape4Component,
    Etape5Component,
    ListedonsComponent,
    AddResultComponent,
    ChoxdonneurComponent,
    SignupComponent,
    FormErrorComponent,
    UploadLogoComponent,
    UploadSignatureComponent,

    
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    GooglePlaceModule,
    ReactiveFormsModule,
BrowserAnimationsModule,
NgxMaskModule.forRoot(maskConfig),
ToastrModule.forRoot({
  positionClass :'toast-bottom-right'
}),
FormsModule,
HttpClientModule,

SignaturePadModule,
  
  

    MaterialModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true,useHash: true  } // <-- debugging purposes only
    ),
    NgbModule
 
  ],
  exports:[
    HeaderComponent,
  ],
  providers: [CentreService,headerTitleService,CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
