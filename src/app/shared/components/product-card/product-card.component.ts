import {Component, Input, OnInit} from '@angular/core';

import {Product} from "../../interfaces";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() card: Product
  // sub: Subscription

  constructor() {
    // const intervalStream$ = interval(5000)
    // this.sub = intervalStream$.subscribe( (value) => {
    //   // console.log(value)
    // })
  }

  ngOnInit(): void {
  }

  // stop() {
  //   this.sub.unsubscribe()
  // }

  getDiscount(): number {
    return this.card.price - this.card.price * this.card.discount / 100
  }

  getDifferenceTime () {
    const discountTimeUntil = new Date(this.card.discountUntil)
    const timeNow = new Date()
    let globalStatus,
      daysStatus,
      timeStatus,
      diffTimeMilliseconds = discountTimeUntil.getTime() - timeNow.getTime(),
      daysCount = Math.trunc(diffTimeMilliseconds/1000/60/60/24),    //days
      hoursCount = Math.trunc(diffTimeMilliseconds/1000/60/60 - daysCount*24),    //hours
      minutesCount = Math.trunc(diffTimeMilliseconds/1000/60 - daysCount*24*60 - hoursCount*60),  //minutes
      secondsCount = Math.trunc(diffTimeMilliseconds/1000 - daysCount*24*60*60 - hoursCount*60*60 - minutesCount*60)    //seconds

    daysCount < 0 ? daysCount = 0 : daysCount
    hoursCount < 0 ? hoursCount = 0 : hoursCount
    minutesCount < 0 ? minutesCount = 0 : minutesCount
    secondsCount < 0 ? secondsCount = 0 : secondsCount

    daysCount ? daysStatus = true : daysStatus = false
    hoursCount > 0 || minutesCount > 0 || secondsCount > 0
      ? timeStatus = true
      : timeStatus = false
    daysStatus || timeStatus ? globalStatus = true : globalStatus = false

    let timesText = ('0' + hoursCount).slice(-2) + ":"
      + ('0' + minutesCount).slice(-2) + ":"
      + ('0' + secondsCount).slice(-2)

    return {
      hidden: globalStatus,
      days:daysCount,
      times: timesText
    }
  }

}
