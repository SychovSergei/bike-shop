import {Component, Input, OnInit} from '@angular/core';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {Review} from "../../interfaces";

interface StarItem {
  num: number,
  value: boolean
}

@Component({
  selector: 'app-star-rates',
  templateUrl: './star-rates.component.html',
  styleUrls: ['./star-rates.component.scss']
})
export class StarRatesComponent implements OnInit {

  @Input() rates: Review[]
  @Input() quantity: number
  stars: StarItem[]
  currentRate: number
  selectedRate: number

  constructor(library: FaIconLibrary) {
    library.addIcons(fasStar, farStar);
  }

  ngOnInit(): void {
    this.stars = []
    if (this.rates === undefined) {
      this.rates = []
    }
    if (this.rates) {
      this.currentRate = this.getCurrentAvgRate(this.rates)
      this.stars = this.createStars(this.stars, this.currentRate, this.quantity)
    }

  }

  createStars (stars: StarItem[], currRate: number = 0, quant: number) {
    stars.length = 0
    for (let i = 0; i < quant; i++) {
      stars[i] = ({ num: i + 1, value: (i+1 <= Math.round(currRate)) })
    }
    return stars
  }

  getCurrentAvgRate(rates: Review[]): number {
    let sum = 0
    if (rates.length > 0) {
      sum = rates
        .map(item => item.rating)
        .reduce((prev, curr) => prev + curr, 0)
      return sum/rates.length
    } else {
      return sum
    }
  }

  mouseHover(event: MouseEvent) {
    const starId = +(event.target as Element).closest('.star')!.id.replace('id_', '')
    this.createStars (this.stars, starId, this.quantity)
  }

  mouseLeave() {
    this.createStars (this.stars, this.currentRate, this.quantity)
  }

  mouseClick(event: MouseEvent) {
    this.selectedRate = +(event.target as Element).closest('.star')!.id.replace('id_', '')
    this.createStars (this.stars, this.selectedRate, this.quantity)
    this.currentRate = this.selectedRate
  }

  test(event: Event) {
    event.preventDefault()
  }

}
