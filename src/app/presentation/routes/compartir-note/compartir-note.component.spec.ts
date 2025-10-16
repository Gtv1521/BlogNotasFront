import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompartirNoteComponent } from './compartir-note.component';

describe('CompartirNoteComponent', () => {
  let component: CompartirNoteComponent;
  let fixture: ComponentFixture<CompartirNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompartirNoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompartirNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
