import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarLibretaComponent } from './cambiar-libreta.component';

describe('CambiarLibretaComponent', () => {
  let component: CambiarLibretaComponent;
  let fixture: ComponentFixture<CambiarLibretaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CambiarLibretaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambiarLibretaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
