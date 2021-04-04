import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { ValidationemailComponent } from './validationemail/validationemail.component';
import { ChngpwdComponent } from './chngpwd/chngpwd.component';

const routes: Routes = [   
{  
  path: 'login',
  component: LoginComponent
},
{
  path: 'signup',
  component: SignupComponent
},
{
  path: 'reset-password',
  component: PasswordresetComponent
},
{
  path:'change/:id',
  component :ChngpwdComponent
},
{
  path: 'code-verification/:id',
  component: ValidationemailComponent
},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
