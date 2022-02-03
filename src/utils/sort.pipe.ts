import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(arr: any[], destinationCity: string): any[] {
    let filteredArr: any = []
    arr.forEach((el: any) => {
      if (el.destination_name === destinationCity) {
        filteredArr.unshift(el);
      } else {
        filteredArr.push(el)
      }
    });
    return filteredArr;
  }
}
