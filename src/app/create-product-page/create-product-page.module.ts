import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";

import {CreateProductPageComponent} from "./create-product-page.component";
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {SelectButtonModule} from 'primeng/selectbutton';
import {DropdownModule} from "primeng/dropdown";
import {CheckboxModule} from "primeng/checkbox";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputSwitchModule} from "primeng/inputswitch";
import {CalendarModule} from "primeng/calendar";
import {MultiSelectModule} from "primeng/multiselect";
import {FileUploadModule} from "primeng/fileupload";
import {ToastModule} from "primeng/toast";

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
        { path: '', component: CreateProductPageComponent }
      ]
    ),
    InputNumberModule,
    SelectButtonModule,
    InputTextModule,
    CheckboxModule,
    DropdownModule,
    InputTextareaModule,
    InputSwitchModule,
    CalendarModule,
    MultiSelectModule,
    FileUploadModule,
    ToastModule,
  ],
  exports: [
    RouterModule,
    InputNumberModule,
    SelectButtonModule,
    InputTextModule,
    CheckboxModule,
    DropdownModule,
    InputTextareaModule,
    InputSwitchModule,
    CalendarModule,
    MultiSelectModule,
    FileUploadModule,
    ToastModule,
  ]
})

export class CreateProductPageModule { }
