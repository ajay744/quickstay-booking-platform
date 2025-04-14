import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoysPgComponent } from './boys-pg.component';

describe('BoysPgComponent', () => {
  let component: BoysPgComponent;
  let fixture: ComponentFixture<BoysPgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoysPgComponent]
    });
    fixture = TestBed.createComponent(BoysPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
