import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'count',
})
export class Count implements PipeTransform {
  public count: any;
  transform(value: any): any {
    if (!value) {
      return false;
    }
    this.count = value / (1000 * 60 * 60);
    return this.count;
  }
}
