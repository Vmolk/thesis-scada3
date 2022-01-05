import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixingTankComponent } from './mixing_tank.component';

describe('TankComponent', () => {
  let component: MixingTankComponent;
  let fixture: ComponentFixture<MixingTankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MixingTankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MixingTankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
