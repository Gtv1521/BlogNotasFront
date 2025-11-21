import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetNotificationsComponent } from './target-notifications.component';

describe('TargetNotificationsComponent', () => {
  let component: TargetNotificationsComponent;
  let fixture: ComponentFixture<TargetNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetNotificationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TargetNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
