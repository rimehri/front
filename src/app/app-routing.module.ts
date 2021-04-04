import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './internaute/homepage/homepage.component';

import { AdminModule } from './admin/admin.module';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { ClientModule } from './client/client.module';
import { HomeClientComponent } from './client/home-client/home-client.component';


const routes: Routes = [
  { path: '',
  component: HomepageComponent,
   loadChildren: () =>
    import('./internaute/internaute.module')
    .then(m => m. InternauteModule) },


    { path:'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },

    { path:'admin',
    component:HomeAdminComponent,loadChildren: () =>
    import('./admin/admin.module')
    .then(m => m. AdminModule) },



    { path:'client',
    component:HomeClientComponent,loadChildren: () =>
    import('./client/client.module')
    .then(m => m. ClientModule) },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
