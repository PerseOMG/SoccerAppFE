import { Pipe, PipeTransform } from '@angular/core';
import { Team } from '../models/team.models';

@Pipe({
  name: 'stringFilter',
})
export class StringFilterPipe implements PipeTransform {
  transform(teams: Team[], value: string): Team[] {
    if (value === '') {
      return teams;
    }
    return teams.filter((team) =>
      team.name.toLowerCase().includes(value.toLowerCase())
    );
  }
}
