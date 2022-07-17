import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProgressBarComponent} from "./components/progress-bar/progress-bar.component";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {OrderPageComponent} from "./order-page.component";
import {ThanksPageComponent} from "./components/thanks-page/thanks-page.component";
import {SendOrderData} from "./send-order-data.service";

@NgModule({
  declarations: [
    ProgressBarComponent,
    ThanksPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
        { path: '', component: OrderPageComponent },
        { path: 'thanks', component: ThanksPageComponent}
      ]
    )
  ],
  exports: [
    ProgressBarComponent,
    RouterModule
  ],
  providers: [SendOrderData]
})

export class OrderPageModule {

  constructor (
  ) {}


}
