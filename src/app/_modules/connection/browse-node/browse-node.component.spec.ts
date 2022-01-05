import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseNodeComponent } from './browse-node.component';

describe('BrowseNodeComponent', () => {
  let component: BrowseNodeComponent;
  let fixture: ComponentFixture<BrowseNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
