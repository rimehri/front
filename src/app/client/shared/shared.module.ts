import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterClientComponent } from './footer-client/footer-client.component';
import { HeaderClientComponent } from './header-client/header-client.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [ FooterClientComponent, HeaderClientComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    HeaderClientComponent,
    FooterClientComponent,
    MatMenuModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class SharedModule { }
