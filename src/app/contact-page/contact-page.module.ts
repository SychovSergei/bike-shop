import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {ContactFormComponent} from "./components/contact-form/contact-form.component";
import {ContactPageComponent} from "./contact-page.component";

@NgModule({
  declarations: [
    ContactFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
        { path: '', component: ContactPageComponent }
      ]
    )
  ],
  exports: [
    ContactFormComponent,
    RouterModule
  ]
})

export class ContactPageModule { }
