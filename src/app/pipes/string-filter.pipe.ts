import { Pipe, PipeTransform } from '@angular/core';
import { Team } from '../models/team.models';
import { ITournament } from '../models/tournament.model';

@Pipe({
  name: 'stringFilter',
})
export class StringFilterPipe implements PipeTransform {
  transform(filterArray: any[], value: string): any[] {
    if (value === '' || !value) {
      return filterArray;
    }
    return filterArray.filter((item) =>
      item.name.toLowerCase().startsWith(value.toLowerCase())
    );
  }
}
