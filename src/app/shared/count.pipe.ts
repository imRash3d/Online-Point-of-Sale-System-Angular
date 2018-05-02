import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'count'
})
export class CountPipe implements PipeTransform {

  transform(object: any): any {
    
let count=0
let item = Object.values(object)
for(let i=0; i<Object.keys(item).length;i++){
 count=count+Object.values(item[i])[1];
}

  return count ;

}
}
