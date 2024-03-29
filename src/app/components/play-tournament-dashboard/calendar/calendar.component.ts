import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @Input() calendar: any[];
  @Input() set currentEdition(value: number) {
    if (value < this.calendar.length) {
      this.selectedPhaseIdx = value + 1;
      this.checkValue();
    }
  }
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

  nextPhase() {
    if (this.selectedPhaseIdx < this.calendar.length) {
      this.selectedPhaseIdx++;
      this.checkValue();
    }
  }

  previousPhase() {
    if (this.selectedPhaseIdx > 1) {
      this.selectedPhaseIdx--;
      this.checkValue();
    }
  }
}
