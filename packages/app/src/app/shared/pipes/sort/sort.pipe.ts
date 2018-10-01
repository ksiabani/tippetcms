import { Pipe, PipeTransform } from '@angular/core';

/*
 * Sort any array of objects by a given property
 * Accepts object's property name
 * Usage:
 *   arr | sort: property
*/
@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(arr: any, prop: any): any {
    return arr.sort(function (a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      }
      if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    });
  }
}
