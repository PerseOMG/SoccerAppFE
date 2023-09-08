import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @Input() calendar: any[];
  selectedPhaseIdx = 1;
  selectedPhase$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  constructor() {}

  ngOnInit(): void {
    this.selectedPhase$.next(this.calendar[this.selectedPhaseIdx - 1]);
  }

  checkValue() {
    if (
      this.selectedPhaseIdx - 1 >= 0 &&
      this.selectedPhaseIdx - 1 < this.calendar.length
    ) {
      this.selectedPhase$.next(this.calendar[this.selectedPhaseIdx - 1]);
    } else {
      this.selectedPhaseIdx = 1;
      this.selectedPhase$.next(this.calendar[0]);
    }
  }
}
