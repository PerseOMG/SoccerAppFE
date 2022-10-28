import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFullComponent } from './card-full.component';

describe('CardFullComponent', () => {
  let component: CardFullComponent;
  let fixture: ComponentFixture<CardFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardFullComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
