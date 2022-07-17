import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SendOrderData} from "../../send-order-data.service";
import {Product, Order} from "../../../shared/interfaces";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-thanks-page',
  templateUrl: './thanks-page.component.html',
  styleUrls: ['./thanks-page.component.scss']
})
export class ThanksPageComponent implements OnInit, OnDestroy {

  product: Product
  order: Order
  oSub: Subscription

  constructor(
    private router: Router,
    private sendOrder: SendOrderData,
  ) { }

  ngOnInit(): void {
    this.oSub = this.sendOrder.currentOrder.subscribe(data => this.order = data)
  }

  ngOnDestroy() {
    this.oSub.unsubscribe()
  }

  onClick() {
    this.router.navigate(['/order'])
  }
}
