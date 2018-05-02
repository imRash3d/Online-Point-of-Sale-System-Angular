import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vallueArray'
})
export class VallueArrayPipe implements PipeTransform {

  transform(objects : any = []) {
    return Object.values(objects);
  }

}
