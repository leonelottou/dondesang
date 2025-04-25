import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/head/head.component';
import { MenuChoixComponent } from './pages/menu-choix/menu-choix.component';

const routes: Routes = [
  { path: '', component: AppComponent},
  { path: 'welcome', component: MenuChoixComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
