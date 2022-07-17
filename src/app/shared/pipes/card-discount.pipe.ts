import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'cardDiscount'
})
export class CardDiscountPipe implements PipeTransform{
  transform(price: number, discountPercent: number): number {
    return price - price * discountPercent / 100
  }
}
