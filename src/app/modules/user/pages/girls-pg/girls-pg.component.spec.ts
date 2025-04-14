import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GirlsPgComponent } from './girls-pg.component';

describe('GirlsPgComponent', () => {
  let component: GirlsPgComponent;
  let fixture: ComponentFixture<GirlsPgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GirlsPgComponent]
    });
    fixture = TestBed.createComponent(GirlsPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
