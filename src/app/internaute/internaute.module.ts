import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { InternauteRoutingModule } from './internaute-routing.module';
import { HomepageComponent } from './homepage/homepage.component';


@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    InternauteRoutingModule,
    SharedModule
  ]
  ,
  exports: [
    HomepageComponent  ]
})
export class InternauteModule { }
