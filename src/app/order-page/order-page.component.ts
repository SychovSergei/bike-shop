import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {Product, Order} from "../shared/interfaces";
import {ProductService} from "../shared/services/product.service";
import {Steps} from "./components/progress-bar/progress-bar.component";
import {SendOrderData} from "./send-order-data.service";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {

  steps: Steps[] = [
    {id: 1, name: "Select product", complete: false},
    {id: 2, name: "Delivery address", complete: false},
    {id: 3, name: "Payment method", complete: false},
    {id: 4, name: "Date of delivery", complete: false},
    {id: 5, name: "Summarize Info", complete: false}
  ]

  currentStep: number
  cards: Product[]
  orderForm: FormGroup
  order: Order
  prodIndex: string
  prodDescription: string
  prodName: string
  now: Date
  today: string
  tomorrow: string
  viewCalendar: string
  calendarValue: string
  calendarMinValue: string

  constructor(
    private cardService: ProductService,
    private router: Router,
    private sendOrder: SendOrderData
  ) {}

  ngOnInit(): void {

    this.currentStep = 1
    this.prodIndex = ''
    this.viewCalendar = 'hidden'
    this.today = this.getToday()
    this.tomorrow = this.getTomorrow()
    this.calendarMinValue = this.getMinCalendar()
    this.calendarValue = this.calendarMinValue

    this.cardService.getAll()
      .subscribe(cards => this.cards = cards)

    this.sendOrder.currentOrder.subscribe(order => this.order = order)

    this.getDescription()

    this.orderForm = new FormGroup({
      productInfo: new FormGroup({
        productId: new FormControl( this.prodIndex, Validators.required)
      }),
      deliveryAddress: new FormGroup({
        country: new FormControl('', [
          Validators.required,
          Validators.minLength(2)
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2)
        ]),
        address: new FormControl('', [
          Validators.required,
          Validators.minLength(5)
        ])
      }),
      paymentMethod: new FormGroup({
        payment: new FormControl( '',
          Validators.required)
      }),
      deliveryDate: new FormGroup({
        date: new FormControl( '', [
          Validators.required
        ])
      })
    })

    this.orderForm.get('deliveryDate.date')?.valueChanges.subscribe(date => {
      (date == this.today || date == this.tomorrow)
        ? this.viewCalendar = 'hidden'
        : this.viewCalendar = 'visible'
    })
  }

  getDescription(event?: Event) {
    if (event) {
      this.prodIndex = (event!.target as HTMLSelectElement).value
    }
    this.prodDescription = this.prodIndex
      ? this.cards.find(card => card.id === this.prodIndex)!.description
      : this.prodDescription = 'Select product...'
  }

  nextStep() {
    this.steps.find(x => x.id === this.currentStep)!.complete = true
    if (this.currentStep == 1) {
      this.getProductName()
    }
    this.currentStep++
  }
  prevStep() {
    this.currentStep--
  }

  getProductName() {
    this.prodName = this.cards.find(item => item.id === this.orderForm.get('productInfo')!.get('productId')!.value)!.name
  }

  getToday(): string {
    const now = new Date()
    return now.getFullYear() + '-' + ("0" + (now.getMonth()+1)).slice(-2) + '-'  + ("0" + now.getDate()).slice(-2)
  }

  getTomorrow(): string {
    const tomorrow = new Date(new Date().getTime() + 1000*60*60*24)
    return tomorrow.getFullYear() + '-' + ("0" + (tomorrow.getMonth()+1)).slice(-2) + '-'  + ("0" + tomorrow.getDate()).slice(-2)
  }
  getMinCalendar(): string {
    const calendar = new Date(new Date().getTime() + 1000*60*60*24*2)
    return calendar.getFullYear() + '-' + ("0" + (calendar.getMonth()+1)).slice(-2) + '-'  + ("0" + calendar.getDate()).slice(-2)
  }

  updateDate(event: Event) {
    this.calendarValue = (event.target as HTMLSelectElement).value
    this.orderForm.get('deliveryDate.date')!
      .setValue(
        (event.target as HTMLSelectElement).value,
        {emitModelToViewChange: false}
      )
  }

  submit() {
    if (this.orderForm.invalid) {
      return
    }
    this.order.product.id = this.orderForm.value.productInfo.productId
    this.order.address.country = this.orderForm.value.deliveryAddress.country
    this.order.address.city = this.orderForm.value.deliveryAddress.city
    this.order.address.address = this.orderForm.value.deliveryAddress.address
    this.order.paymentMethod.payment = this.orderForm.value.paymentMethod.payment
    this.order.deliveryDate.date = this.orderForm.value.deliveryDate.date

    this.sendOrder.changeOrderData(this.order)
    this.router.navigate(['/order', 'thanks'])
  }
}
