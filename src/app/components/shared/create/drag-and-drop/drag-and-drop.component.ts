import { Component, OnDestroy, OnInit, Output, Input } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss'],
})
export class DragAndDropComponent implements OnInit, OnDestroy {
  @Input() dragObjTemplate: any[] = [];
  @Output() dragObjSelected: BehaviorSubject<any[]> = new BehaviorSubject([]);
  dragObjSelectedArray: any[] = [];
  subs = new Subscription();

  ngOnInit(): void {}

  public constructor(private dragulaService: DragulaService) {
    this.subs.add(
      this.dragulaService.dropModel('D&DITEMS').subscribe(({ item }) => {
        if (this.dragObjSelected.value.includes(item)) {
          this.dragObjSelectedArray = this.dragObjSelected.value.filter(
            (selected: any) => selected._id !== item._id
          );
          this.dragObjSelected.next(
            this.dragObjSelected.value.filter(
              (selected: any) => selected._id !== item._id
            )
          );
        } else {
          this.dragObjSelectedArray.push(item);
          this.dragObjSelected.next([...this.dragObjSelected.value, item]);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
