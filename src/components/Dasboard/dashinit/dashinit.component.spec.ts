import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashinitComponent } from './dashinit.component';

describe('DashinitComponent', () => {
  let component: DashinitComponent;
  let fixture: ComponentFixture<DashinitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashinitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashinitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
