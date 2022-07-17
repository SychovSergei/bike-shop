import {Injectable, OnInit} from '@angular/core';
import {Order} from "../shared/interfaces";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class SendOrderData implements OnInit {

  private orderSource = new BehaviorSubject<Order>({
    address: {address: "", city: "", country: ""},
    deliveryDate: {date: ""},
    paymentMethod: {payment: ""},
    product: {id: ""}
  })
  currentOrder = this.orderSource.asObservable()

  constructor() { }

  changeOrderData(order: Order) {
    this.orderSource.next(order)
  }

  ngOnInit(): void {
  }
}
