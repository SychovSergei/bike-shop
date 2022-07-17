import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'limitchar'
})
export class LimitCharPipe implements PipeTransform{
  transform(text: string, limit: number = 30): string {
    if (limit === 0) { return text }
    return text.substring( 0 , limit).concat('...')
  }
}
