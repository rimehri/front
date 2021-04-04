import {  AuthServicee } from './services/auth.service';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import {AdminModule} from './admin/admin.module';

import {InternauteModule} from './internaute/internaute.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {AccountModule} from './account/account.module';
import {ClientModule} from './client/client.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './auth-interceptor.service';
import { GlobalService } from './global.service';
import {MatIconModule} from '@angular/material/icon';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { InitialazerService } from './initialazer.service';
import { configurationFactory } from './configurationFactory';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';


@NgModule({

  imports: [
    SocialLoginModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AdminModule,
    AppRoutingModule,
    SharedModule,
    InternauteModule,
    NgbModule,
    BrowserAnimationsModule,
    BrowserModule,
    ClientModule,
    AccountModule,MatIconModule,
    NgxDropzoneModule

  ],
  declarations: [
    AppComponent,



  ],

  providers: [AuthServicee,  
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      GlobalService,
      InitialazerService,
      {
        provide: APP_INITIALIZER,
        useFactory: configurationFactory,
        deps: [InitialazerService],
        multi: true,
      },
      {
        provide: 'SocialAuthServiceConfig',
        useValue: {
          autoLogin: false,
          providers: [
            {
              id: GoogleLoginProvider.PROVIDER_ID,
              provider: new GoogleLoginProvider(
                '992171802483-b2509a16j76clmmkr32965uvm5gvu3jt.apps.googleusercontent.com'
              )
            },
            {
              id: FacebookLoginProvider.PROVIDER_ID,
              provider: new FacebookLoginProvider('471159557632201')
            }
          ]
        } as SocialAuthServiceConfig,
      }
   

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
